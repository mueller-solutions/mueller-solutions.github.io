import type { AxiosResponse } from 'axios';
import pipedriveClient from '../clients/pipedrive.client';
import {
  type Lead,
  type LeadData,
  type LeadInput,
  type Note,
  type NoteData,
  type NoteInput,
  type Organization,
  type OrganizationInput,
  type Person,
  type PersonData,
  type PersonInput,
  type PipedriveResponse,
} from '../types';

/**
 * A service for interacting with Pipedrive.
 */
class PipedriveService {
  constructor(protected client: typeof pipedriveClient) {
    this.client = client;
  }

  private async handleResponse<T>(response: AxiosResponse<PipedriveResponse<T>>): Promise<T> {
    if (!response.data.success) {
      throw new Error('Request failed');
    }
    return response.data.data;
  }

  /**
   * Create a new lead in Pipedrive.
   * @param prefix - The prefix to add to the lead name
   * @param lead - The lead to create
   * @returns True if the lead was created successfully, false otherwise
   */
  async createLead(prefix: string, lead: LeadInput) {
    try {
      const companyId = lead.company ? await this.createOrganization({ name: lead.company }) : null;

      const personId = await this.createPerson({
        name: lead.name,
        email: lead.email,
        organizationId: companyId,
        phone: lead.phone,
      });

      const newLead: LeadData = {
        title: `[${prefix}] ${lead.name}`,
        person_id: personId,
        organization_id: companyId ?? undefined,
      };

      const leadResponse = await this.client.post<PipedriveResponse<Lead>>('/leads', newLead);
      const leadData = await this.handleResponse(leadResponse);

      if (lead.message) {
        await this.createNote({
          leadId: leadData.id,
          content: `<p><strong>Message:</strong></p><p>${lead.message}</p>`,
        });
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Create a new organization in Pipedrive.
   * @param company - The organization to create
   * @returns The ID of the created organization
   */
  async createOrganization(company: OrganizationInput) {
    const response = await this.client.post<PipedriveResponse<Organization>>('/organizations', company);
    const organizationData = await this.handleResponse(response);
    return organizationData.id;
  }

  /**
   * Create a new person in Pipedrive.
   * @param person - The person to create
   * @returns The ID of the created person
   */
  async createPerson({ name, email, organizationId, phone }: PersonInput) {
    const newPerson: PersonData = {
      name,
      email,
      org_id: organizationId ?? undefined,
      phone: phone ?? undefined,
    };

    const response = await this.client.post<PipedriveResponse<Person>>('/persons', newPerson);
    const personData = await this.handleResponse(response);
    return personData.id;
  }

  /**
   * Create a new note in Pipedrive.
   * @param note - The note to create
   * @returns True if the note was created successfully, false otherwise
   */
  async createNote({ leadId, content }: NoteInput) {
    const newNote: NoteData = { lead_id: leadId, content };
    const response = await this.client.post<PipedriveResponse<Note>>('/notes', newNote);
    await this.handleResponse(response);
    return true;
  }

  /**
   * Update a Pipedrive lead with a download link
   * @param leadId - The ID of the lead to update
   * @param downloadLink - The download link to add to the lead
   * @returns True if the lead was updated successfully, false otherwise
   */
  async addDownloadLinkToLead(leadId: string, downloadLink: string) {
    const newNote: NoteData = {
      lead_id: Number(leadId),
      content: `Download link: ${downloadLink}`,
    };

    const response = await this.client.post<PipedriveResponse<Note>>('/notes', newNote);
    await this.handleResponse(response);
    return true;
  }
}

const pipedriveService = new PipedriveService(pipedriveClient);

export default pipedriveService;
