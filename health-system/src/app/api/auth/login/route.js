import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
    }

    const doctor = await prisma.doctor.findUnique({ where: { email } });
    if (!doctor) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, doctor.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }

    // For now, just return success and doctor info (no real session handling yet)
    return new Response(JSON.stringify({ message: 'Login successful', doctor_id: doctor.doctor_id }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), { status: 500 });
  }
}
