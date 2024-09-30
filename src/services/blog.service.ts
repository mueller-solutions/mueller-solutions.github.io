import WPAPI from 'wpapi';

export type BlogPost = {
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

const wp = new WPAPI({
  endpoint: import.meta.env.WP_API_URL,
});

class BlogService {
  private wp = new WPAPI({
    endpoint: import.meta.env.WP_API_URL,
  });

  async getPosts(): Promise<BlogPost[]> {
    return this.wp.posts().get();
  }
}

const blogService = new BlogService();

export default blogService;
