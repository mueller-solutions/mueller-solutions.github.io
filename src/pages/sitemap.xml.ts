import { type APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import dayjs from 'dayjs';

const blockedPages: string[] = [
  '404',
  '[...slug]',
  'booking-confirmed',
  'checklist-registration-success',
  'contact-success',
];

/**
 * Replace .astro with / and remove index and trailing slash.
 * @param page - The page to replace
 * @returns The replaced page
 */
function replaceAstroWithSlash(page: string) {
  return page.replace('.astro', '').replace('./', '/').replace('index', '').replace(/\/$/, '');
}

export const GET: APIRoute = async ({ url }) => {
  const pages = import.meta.glob('./**/*.astro');
  const filteredPages = Object.keys(pages).filter((page) => {
    return blockedPages.every((blockedPage) => !page.includes(blockedPage));
  });

  const posts = await getCollection('blog', (post) => !post.data.draft);
  const orderedPosts = posts.sort((a, b) => new Date(b.data.posted).getTime() - new Date(a.data.posted).getTime());
  const lastMod = dayjs(orderedPosts[0].data.posted).toISOString();

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${filteredPages.map((page) => `<url><loc>${url.origin}${replaceAstroWithSlash(page)}</loc></url>`).join('')}
${orderedPosts.map((post) => `<url><loc>${url.origin}/blog/${post.slug}</loc><lastmod>${dayjs(post.data.posted).toISOString()}</lastmod></url>`).join('')}
</urlset>`,
    {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
};