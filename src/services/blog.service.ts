import wordpressClient from '../clients/wordpress.client';

class BlogService {
  constructor(protected client: typeof wordpressClient) {
    this.client = client;
  }

  async getPosts(page: number = 1) {
    try {
      const response = await this.client.get(`posts?_embed&per_page=20&page=${page}&orderby=date&order=desc`);
      const numPages = parseInt(response.headers['x-wp-totalpages'], 10);
      return { posts: response.data, numPages, currentPage: page };
    } catch (error) {
      console.error(error);
      return { posts: [], numPages: 0, currentPage: page };
    }
  }

  async getPost(slug: string) {
    try {
      const response = await this.client.get(`posts?slug=${slug}&_embed`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

const blogService = new BlogService(wordpressClient);

export default blogService;
