export interface Credential {
    id: number;
    title: string;
    username: string;
    password?: string; // nullable because usually we won't fetch it
    url: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
  }
  