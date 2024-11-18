import type { APIRoute } from 'astro';
import zapierService from '../../../services/zapier.service';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const message = data.get('message') as string;
    const phone = data.get('phone') as string | undefined;
    const company = data.get('company') as string | undefined;

    const success = await zapierService.sendContactForm({
      name: name,
      email: email,
      company: company,
      phone: phone,
      message: message,
    });

    if (!success) {
      return new Response(null, {
        status: 200,
        headers: {
          'HX-Trigger': JSON.stringify({ contactSubmit: 'contact-submit-failed' }),
        },
      });
    }

    return new Response(null, {
      status: 200,
      headers: {
        'HX-Location': '/contact-success',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return new Response(null, {
      status: 200,
      headers: {
        'HX-Trigger': JSON.stringify({ contactSubmit: 'contact-submit-failed' }),
      },
    });
  }
};
