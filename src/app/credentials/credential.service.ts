// src/app/credentials/credential.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential, CredentialRequest } from '../models/credential';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CredentialService {
  
  private apiUrl = '/api/credentials';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Credential[]> {
    return this.http.get<Credential[]>(this.apiUrl);
  }
  
  getById(id: number): Observable<Credential> {
    return this.http.get<Credential>(`${this.apiUrl}/${id}`);
  }

  getDecryptedPassword(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${id}/password`, { responseType: 'text' });
  }  

  create(credential: CredentialRequest): Observable<Credential> {
    return this.http.post<Credential>(`${this.apiUrl}`, credential);
  }
  
  update(id: number, credential: CredentialRequest): Observable<Credential> {
    return this.http.put<Credential>(`${this.apiUrl}/${id}`, credential);
  }
  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
