import axios from 'axios';

const client = axios.create({
  baseURL: `${import.meta.env.WP_API_URL}/wp/v2/`,
});

export default client;
