import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // TODO: Integrate with your email service (e.g., Nodemailer, Resend, SendGrid, etc.)
    // For now, just log the message and return success
    console.log('Contact form submission:', { name, email, message });

    // Simulate success
    return NextResponse.json({ success: true, message: 'Message received!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 });
  }
}
