import { BehaviorSubject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication, StorageInfo, User } from './../../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  
  constructor(private http: HttpClient) { }
  
  private dataEdit = new BehaviorSubject<User>(null);
  botaoEdit = this.dataEdit.asObservable();
  api_url = environment.api_url;
  username = localStorage.getItem('username');
  password = localStorage.getItem('password');


  // authentication(authentication: Authentication) {
  //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(authentication.username + ':' + authentication.password) });
  //   return this.http.get(this.api_url + 'user/login', { headers, responseType: 'text' as 'text' }).pipe(
  //     map(
  //       authData => {
  //         return authData;
  //       }
  //     )
  //   );
  // }

  authentication(authentication: Authentication){
    const headers = new HttpHeaders ({ Authorization: 'Basic ' 
    + btoa(authentication.username + ':' + authentication.password)});
    return this.http.get(this.api_url + 'user/login', {headers}).pipe(
      map(authData => {

        let storageInformation: StorageInfo = {
          token: authData[0],
          admin: authData[1]
        }
        console.log(storageInformation);
        return  storageInformation;
      }
      )
    );
  }

  getUserList(user: User) {
    this.dataEdit.next(user);
  }

  getUser() {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.get<User[]>(this.api_url + 'user', {headers}).pipe(
      map(
        userData => {
          if (userData){
            return userData
          }else{
            return [];
          }
        }
      )
    );
  }

  
  deleteUsers(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.delete(this.api_url + 'user/' + id, {headers, responseType: 'text' as 'text'}).pipe(
      map(
        userData => {
          return userData;
        }
      )
    );
  }

  createUsers(user: User){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.post<User>(this.api_url + 'user', user, {headers}).pipe(
      map(
        userData => {
          return userData;
        }
      )
    );
  }

  getUserForList(user: User){
    this.dataEdit.next(user);
  }

  updateUsers(user: User){
    const id = user.id;
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.put<User>(this.api_url + 'user/' + id, user, {headers}).pipe(
      map(
        userData => {
          return userData;
        }
      )
    );
  }
  
  findContactById(){
    console.log('desafio para vocês');
  }

}
