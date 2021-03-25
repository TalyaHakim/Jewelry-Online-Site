import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { USER } from './user';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient, private afModule: AngularFireAuth) { }

  addUser(Users:USER): Observable<USER[]> {
    return this.http.post<USER[]>(`${environment.Api}/users`, Users);
  }

  getCurrentUser() {
    return new Promise(
      (resolve, reject) => {
        const user = this.afModule.authState.subscribe(
          user =>  resolve(user), err => resolve(null)
        );
      }
    );
  }

}
