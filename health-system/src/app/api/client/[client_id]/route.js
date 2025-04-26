import prisma from '../../../../lib/prisma';


export async function GET(req, { params }) {
  const clientId = Number(params.client_id);

  try {
    const client = await prisma.client.findUnique({
      where: { client_id: clientId },
      include: { programs: { include: { program: true } } }
    });

    if (!client) {
      return new Response(JSON.stringify({ message: 'Client not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(client), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching client', error: error.message }), { status: 500 });
  }
}


export async function PATCH(req, { params }) {
  const clientId = Number(params.client_id);
  const { first_name, last_name, weight, age, program_ids } = await req.json();

  try {
    
    await prisma.client.update({
      where: { client_id: clientId },
      data: {
        first_name,
        last_name,
        weight: weight ? parseFloat(weight) : null,
        age: age ? parseInt(age) : null
      }
    });

    
    if (Array.isArray(program_ids)) {
      
      await prisma.clientProgram.deleteMany({ where: { client_id: clientId } });

      
      const enrollments = program_ids.map(pid => ({
        client_id: clientId,
        program_id: pid
      }));

      if (enrollments.length > 0) {
        await prisma.clientProgram.createMany({ data: enrollments });
      }
    }

    return new Response(JSON.stringify({ message: 'Client updated successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating client', error: error.message }), { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  const clientId = Number(params.client_id);

  try {
     
    await prisma.clientProgram.deleteMany({ where: { client_id: clientId } });

    
    await prisma.client.delete({ where: { client_id: clientId } });

    return new Response(JSON.stringify({ message: 'Client deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting client', error: error.message }), { status: 500 });
  }
}
