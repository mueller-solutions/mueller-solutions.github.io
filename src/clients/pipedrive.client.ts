import axios from 'axios';

const client = axios.create({
  baseURL: `${import.meta.env.PIPEDRIVE_API_URL}/wp/v2/`,
  params: {
    api_token: import.meta.env.PIPEDRIVE_API_TOKEN,
  },
});

export default client;
