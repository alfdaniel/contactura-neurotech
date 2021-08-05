import { Contacts } from './../../models/contacts';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

private dataEdit = new BehaviorSubject<Contacts>(null);
botaoEdit = this.dataEdit.asObservable();

  constructor() { }
  
  getContactsList(contatos: Contacts){
    this.dataEdit.next(contatos);
  }
}


