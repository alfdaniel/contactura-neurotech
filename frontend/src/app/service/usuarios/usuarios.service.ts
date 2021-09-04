import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authentication, User } from './../../models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private dataEdit = new BehaviorSubject<User>(null);
  botaoEdit = this.dataEdit.asObservable();

  constructor(private htpp: HttpClient) { }

  api_url = environment.api_url;

 authentication(authentication: Authentication){
   const headers = new HttpHeaders ({ Authorization: 'Basic ' + btoa(authentication.username + ':' + authentication.password)});
   return this.htpp.get(this.api_url + 'user/login' , {headers, responseType: 'text' as 'text'}).pipe(
     map(
       authData => {
         return authData;
       }
     )
   );
 }

}
