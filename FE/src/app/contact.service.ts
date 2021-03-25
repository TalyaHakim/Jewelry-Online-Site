import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  contactUs(body: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/contact', body)
  }
}
