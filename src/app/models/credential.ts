export interface Credential {
  id: number;
  title: string;
  username: string;
  password?: string; // nullable because usually we won't fetch it
  description: string;
  createdAt: string;
  updatedAt: string;
}
  
export interface CredentialRequest {
  title: string;
  username: string;
  password: string;
  description?: string;
}
  