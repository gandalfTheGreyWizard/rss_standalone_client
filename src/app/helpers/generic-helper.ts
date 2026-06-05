import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DecodedTokenObject } from '../dtos/backend-query-dtos';
@Injectable({
  providedIn: 'root',
})
export class GenericHelper {
  httpClient = inject(HttpClient);
  getAuthorizationHeader() {
    if (localStorage.getItem('token')) {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      };
      return headers;
    }
    return {};
  }

  getCurrentUserId() {
    if (localStorage.getItem('token')) {
      const requestHeaders = this.getAuthorizationHeader();
      this.httpClient.get<DecodedTokenObject>(`${environment.apiUrl}/auth/decode`, { headers: requestHeaders }).subscribe((data) => {
        console.log('user is ', data);
        return data;
      },(err) => {
        console.error(err);
      });
    }
  }
}
