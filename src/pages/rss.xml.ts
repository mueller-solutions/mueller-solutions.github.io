import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('blog', (post) => !post.data.draft);

  return rss({
    title: 'MUELLER Solutions Blog',
    description: 'Stay updated with the latest insights and advice regarding web design and development.',
    site: context.url,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: new Date(post.data.posted),
      link: `/blog/${post.slug}`,
    })),
  });
};
