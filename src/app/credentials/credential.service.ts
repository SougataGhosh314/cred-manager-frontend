// src/app/credentials/credential.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../models/credential';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CredentialService {
  private apiUrl = '/api/credentials';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Credential[]> {
    return this.http.get<Credential[]>(this.apiUrl);
  }
}
