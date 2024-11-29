import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ url }) => {
  return new Response(`
User-agent: *
Disallow: /booking-confirmed
Disallow: /checklist-registration-success
Disallow: /contact-success

Sitemap: ${url.origin}/sitemap.xml
`);
};
