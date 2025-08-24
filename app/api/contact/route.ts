import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONTACT_FROM, CONTACT_EMAIL } from '@/lib/contact';
import ContactEmail from '@/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, phone, message, honeypot } = await request.json();

    // Honeypot spam protection
    if (honeypot) {
      return NextResponse.json(
        { message: 'Zpráva byla úspěšně odeslána' },
        { status: 200 }
      );
    }

    // Basic validation
    if (!phone || !message) {
      return NextResponse.json(
        { error: 'Telefon a zpráva jsou povinné' },
        { status: 400 }
      );
    }

    // Send email using Resend + React Email template
    try {
      await resend.emails.send({
        from: CONTACT_FROM,
        to: CONTACT_EMAIL,
        subject: 'Nová zpráva z kontaktního formuláře',
        react: ContactEmail({
          email: email ?? null,
          phone,
          message: message ?? '',
          submittedAt: new Date().toISOString(),
        }),
      });

      console.log('Email sent successfully for contact form submission:', {
        email,
        phone,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: 'Zpráva byla úspěšně odeslána' },
        { status: 200 }
      );

    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      
      // Still return success to user, but log the error
      // In production, you might want to save to database as fallback
      return NextResponse.json(
        { message: 'Zpráva byla úspěšně odeslána' },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Došlo k chybě při odesílání zprávy' },
      { status: 500 }
    );
  }
}
