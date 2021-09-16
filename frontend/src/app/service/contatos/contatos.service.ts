import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contacts } from './../../models/contacts';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  api_url = environment.api_url;

private dataEdit = new BehaviorSubject<Contacts>(null);
botaoEdit = this.dataEdit.asObservable();
username = localStorage.getItem('username');
password = localStorage.getItem('password');

  constructor(private http: HttpClient) { }
  
  getContactsList(contatos: Contacts){
    this.dataEdit.next(contatos);
  }

  getContacts(){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.get<Contacts[]>(this.api_url + 'contactura', {headers}).pipe(
      map(
        contactData => {
          if (contactData){
            return contactData;
          }else{
            return [];
          }
        }
      )
    );
  }

  createContacts(contact: Contacts){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.post<Contacts>(this.api_url + 'contactura', contact, {headers}).pipe(
      map(
        contactData => {
          if (contactData){
            return contactData;
          }else{
            return [];
          }
        }
      )
    );
  }


  deleteContacts(id: number){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.delete(this.api_url + 'contactura/' + id, {headers, responseType: 'text' as 'text'}).pipe(
      map(
        contactData => {
          return contactData;
        }
      )
    );
  }


  updateContact(contact: Contacts){
    const id = contact.id;
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.put<Contacts>(this.api_url + 'contactura/' + id, contact, {headers}).pipe(
      map(
        contactData => {
          if (contactData){
            return contactData;
          }else{
            return [];
          }
        }
      )
    );
  }


  findContactById(){
   
  }

  findContactByEmail(contact: Contacts){
    const email = contact.email;
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.http.get<Contacts[]>(this.api_url + 'contactura/email?email=' + email, {headers}).pipe(
      map(
        contactData => {
          if (contactData){
            return contactData;
          }else{
            return [];
          }
        }
      )
    );
  }


}


