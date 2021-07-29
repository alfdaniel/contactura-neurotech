import { Contacts } from './../models/contacts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.scss']
})
export class ListaContatosComponent implements OnInit {

  contactsList: Contacts[];
  collection = {count: 10, data: []}

  constructor() { }

  ngOnInit(): void {
  this.populationContacts();
  }

  populationContacts(){
    for (let i = 0; i < this.collection.count; i++) {
      this.collection.data.push({
        name: 'teste' + i,
        email: 'email' + i + '@contactura.com',
        phone: '(' + 0 + 8 + 1 + ')' + 9 + 1 + 1 + 1 + 1 + '-' + 1 + 1 + 1 + 1
      });     
    }
    this.contactsList = this.collection.data;
    console.log(this.contactsList);
  }

}
