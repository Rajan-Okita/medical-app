import prisma from '../../../lib/prisma';

export async function POST(req) {
  try {
    const { program_name, duration } = await req.json();

    if (!program_name || !duration) {
      return new Response(JSON.stringify({ message: 'Program name and duration are required' }), { status: 400 });
    }

    const program = await prisma.program.create({
      data: { program_name, duration: parseInt(duration) }
    });

    return new Response(JSON.stringify({ message: 'Program added successfully', program_id: program.program_id }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    const programs = await prisma.program.findMany();
    return new Response(JSON.stringify(programs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to fetch programs' }), { status: 500 });
  }
}
