export type FormInput = {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message?: string;
  company?: string;
};

export type Lead = {
  id: number;
  title: string;
  person_id: number;
  organization_id?: number;
};

export type LeadData = {
  title: string;
  person_id: number;
  organization_id?: number;
};

export type OrganizationInput = {
  name: string;
};

export type Organization = {
  id: number;
  name: string;
};

export type PersonInput = {
  name: string;
  email: string;
  phone?: string | null;
  organizationId?: number | null;
};

export type PersonData = {
  name: string;
  email: string;
  org_id?: number;
  phone?: string;
};

export type Person = {
  id: number;
  name: string;
  email: string;
  org_id?: number;
  phone?: string;
};

export type NoteInput = {
  leadId: number;
  content: string;
};

export type NoteData = {
  lead_id: number;
  content: string;
};

export type Note = {
  id: number;
  lead_id: number;
  content: string;
};

export type PipedriveResponse<T> = {
  success: boolean;
  data: T;
};
