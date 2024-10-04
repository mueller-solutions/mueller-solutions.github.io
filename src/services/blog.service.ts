import WPAPI from 'wpapi';
import wpClient from '../lib/client';

/**
 * Type representing a blog post.
 */
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

/**
 * Service for fetching blog posts from the WordPress REST API.
 */
class BlogService {
  constructor(protected client: WPAPI) {}

  /**
   * Fetches paginated blog posts.
   * @param page - The page number to fetch.
   * @returns A promise that resolves to an array of Post objects.
   */
  async getPostsPaginated(page: number): Promise<Post[]> {
    try {
      return await this.client.posts().page(page).perPage(20);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Fetches a blog post by its slug.
   * @param slug - The slug of the post to fetch.
   * @returns A promise that resolves to a Post object or null if not found.
   */
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
