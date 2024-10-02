import WPAPI from 'wpapi';

const client = new WPAPI({
  endpoint: import.meta.env.WP_API_URL,
});

export default client;
