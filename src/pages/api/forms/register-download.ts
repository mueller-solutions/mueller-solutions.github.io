export const prerender = false;

import type { APIRoute } from 'astro';
import zapierService from '../../../services/zapier.service';
import downloadService from '../../../services/download.service';
export const POST: APIRoute = async ({ request, url }) => {
  try {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const company = data.get('company') as string | undefined;

    const downloadLink = downloadService.generateDownloadLink(email, 'performance-checklist', url);
    const success = await zapierService.sendDownloadLink(downloadLink, {
      name: name,
      email: email,
      company: company,
    });

    if (!success) {
      return new Response(null, {
        status: 200,
        headers: {
          'HX-Trigger': JSON.stringify({ checklistRegister: 'checklist-registration-failed' }),
        },
      });
    }

    return new Response(null, {
      status: 302,
      headers: {
        'HX-Location': '/checklist-registration-success',
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return new Response(null, {
      status: 200,
      headers: {
        'HX-Trigger': JSON.stringify({ checklistRegister: 'checklist-registration-failed' }),
      },
    });
  }
};
