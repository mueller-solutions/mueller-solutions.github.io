import zapierClient from '../clients/zapier.client';
import type { AxiosResponse } from 'axios';
import type { LeadInput, ZapierResponse } from '../types';

class ZapierService {
  constructor(protected client: typeof zapierClient) {
    this.client = client;
  }

  private async handleResponse(response: AxiosResponse<ZapierResponse>): Promise<ZapierResponse> {
    if (response.data.status === 'failure') {
      throw new Error('Request failed');
    }
    return response.data;
  }

  async sendContactForm(data: LeadInput) {
    try {
      const response = await this.client.post<ZapierResponse>('/2rrac0v/', data);
      await this.handleResponse(response);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

const zapierService = new ZapierService(zapierClient);

export default zapierService;
