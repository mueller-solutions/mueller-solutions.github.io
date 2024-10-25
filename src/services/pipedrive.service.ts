import pipedriveClient from '../clients/pipedrive.client';

class PipedriveService {
  constructor(protected client: typeof pipedriveClient) {
    this.client = client;
  }

  /**
   * Update a Pipedrive lead with a download link
   * @param leadId - The ID of the lead to update
   * @param downloadLink - The download link to add to the lead
   * @returns True if the lead was updated successfully, false otherwise
   */
  async addDownloadLinkToLead(leadId: string, downloadLink: string) {
    const response = await this.client.post(`notes`, {
      data: {
        deal_id: leadId,
        content: `Download link: ${downloadLink}`,
      },
    });

    return response.status === 200;
  }
}

const pipedriveService = new PipedriveService(pipedriveClient);

export default pipedriveService;
