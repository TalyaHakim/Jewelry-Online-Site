import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = new BehaviorSubject<any>(null);

  get userValue() {
    return this._user.value;
  }

  get user() {
    return this._user;
  }

  constructor(private afModule: AngularFireAuth) { }

  googleLogin() {
    return new Promise(
      (resolve, reject) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.afModule.signInWithPopup(provider).then(
          data => {
            this._user.next(data);
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
      }
    );
  }

  googleLogout() {
    return new Promise(
      (resolve, reject) => {
        if (firebase.auth().currentUser) {
          this._user.next(null);
          this.afModule.signOut();
          resolve(true);
        }
        return false;
      });
  }
}
