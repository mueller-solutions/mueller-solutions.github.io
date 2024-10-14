import axios, { type AxiosInstance } from 'axios';

const client = axios.create({
  baseURL: `${import.meta.env.WP_API_URL}/wp/v2/`,
});

class BlogService {
  constructor(protected client: AxiosInstance) {
    this.client = client;
  }

  async getPosts(page: number = 1) {
    const response = await this.client.get(`posts?_embed&per_page=20&page=${page}&orderby=date&order=desc`);
    const numPages = parseInt(response.headers['x-wp-totalpages'], 10);
    return { posts: response.data, numPages, currentPage: page };
  }

  async getPost(slug: string) {
    const response = await this.client.get(`posts?slug=${slug}&_embed`);
    return response.data;
  }
}

const blogService = new BlogService(client);

export default blogService;
