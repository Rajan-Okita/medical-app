import prisma from '../../../lib/prisma';

export async function POST(req) {
  try {
    const { first_name, last_name, weight, age, program_ids } = await req.json();

    if (!first_name || !last_name) {
      return new Response(JSON.stringify({ message: 'First name and last name are required' }), { status: 400 });
    }

    const client = await prisma.client.create({
      data: {
        first_name,
        last_name,
        weight: weight ? parseFloat(weight) : null,
        age: age ? parseInt(age) : null
      }
    });

    if (program_ids && program_ids.length > 0) {
      const enrollments = program_ids.map(pid => ({ client_id: client.client_id, program_id: pid }));
      await prisma.clientProgram.createMany({ data: enrollments });
    }

    return new Response(JSON.stringify({ message: 'Client added and enrolled successfully' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        programs: { include: { program: true } }
      }
    });
    return new Response(JSON.stringify(clients), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to fetch clients' }), { status: 500 });
  }
}
