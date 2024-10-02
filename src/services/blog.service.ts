import WPAPI from 'wpapi';
import wpClient from '../lib/client';

export type Post = {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  meta: {
    advanced_seo_description: string;
    jetpack_seo_html_title: string;
    jetpack_seo_noindex: boolean;
  };
};

class BlogService {
  constructor(protected client: WPAPI) {}

  async getPostsPaginated(page: number): Promise<Post[]> {
    try {
      return await this.client.posts().page(page).perPage(20);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    try {
      return await this.client.posts().slug(slug).get();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

const blogService = new BlogService(wpClient);

export default blogService;
