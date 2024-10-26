import axios from 'axios';

const client = axios.create({
  baseURL: `${import.meta.env.PIPEDRIVE_API_URL}/v1`,
  params: {
    api_token: import.meta.env.PIPEDRIVE_API_TOKEN,
  },
});

export default client;
