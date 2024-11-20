import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.ZAPIER_API_URL,
});

export default client;
