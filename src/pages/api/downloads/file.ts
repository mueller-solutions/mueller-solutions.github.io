export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'fs';
import downloadService from '../../../services/download.service';

export const GET: APIRoute = async ({ request }) => {
  const token = new URL(request.url).searchParams.get('token');

  if (!token) {
    // FIXME: Redirect the user to a page with a proper message
    return new Response('Missing token', {
      status: 400,
    });
  }

  const filePath = downloadService.getFilePathFromToken(token);

  if (!filePath) {
    // FIXME: Redirect the user to a page with a proper message
    return new Response('Expired link', {
      status: 401,
    });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new Response(fileBuffer, {
    status: 200,
    headers: {
      Location: filePath, // Redirect to PDF file path (local or S3 URL)
      'Content-Type': 'application/pdf', // Ensure proper content type
      'Content-Disposition': `attachment; filename="performance-checklist.pdf"`, // This header forces download
    },
  });
};
