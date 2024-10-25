import type { APIRoute } from 'astro';
import downloadService from '../../../services/download.service';
import pipedriveService from '../../../services/pipedrive.service';

/**
 * Create a download link for a lead
 */
export const POST: APIRoute = async ({ request, url }) => {
  const { leadId, fileName } = await request.json();
  const downloadLink = downloadService.generateDownloadLink(leadId, fileName, url);
  // const success = await pipedriveService.addDownloadLinkToLead(leadId, downloadLink);
  const success = true;
  if (!success) {
    return new Response(JSON.stringify({ error: 'Failed to add download link to lead' }), { status: 500 });
  }
  return new Response(JSON.stringify({ success, downloadLink }), { status: 200 });
};
