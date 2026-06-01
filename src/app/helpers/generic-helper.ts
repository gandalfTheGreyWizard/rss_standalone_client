import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericHelper {
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
}
