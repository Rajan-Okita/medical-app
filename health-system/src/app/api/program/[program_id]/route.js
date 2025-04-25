import prisma from '../../../../lib/prisma';

export async function PATCH(req, { params }) {
  const programId = Number(params.program_id);
  const { program_name, duration } = await req.json();

  try {
    const updatedProgram = await prisma.program.update({
      where: { program_id: programId },
      data: { program_name, duration: parseInt(duration) }
    });

    return new Response(JSON.stringify(updatedProgram), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating program', error: error.message }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const programId = Number(params.program_id);

  try {
    await prisma.program.delete({
      where: { program_id: programId }
    });

    return new Response(JSON.stringify({ message: 'Program deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting program', error: error.message }), { status: 500 });
  }
}
