import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, password } = body;

    if (!first_name || !last_name || !email || !password) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    const existingDoctor = await prisma.Doctor.findUnique({ where: { email } });
    if (existingDoctor) {
      return new Response(JSON.stringify({ message: 'Email already registered' }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await prisma.Doctor.create({
      data: { first_name, last_name, email, password: hashedPassword }
    });

    return new Response(JSON.stringify({ message: 'Signup successful', doctor_id: doctor.doctor_id }), { status: 201 });

  } catch (error) {
    console.error('🔥 Signup API Error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
