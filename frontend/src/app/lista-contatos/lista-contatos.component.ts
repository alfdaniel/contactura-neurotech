import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ContatosService } from './../service/contatos/contatos.service';
import { Contacts } from './../models/contacts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.scss']
})
export class ListaContatosComponent implements OnInit {

  contactsList: Contacts[];
  collection = { count: 10, data: [] }

  constructor(private contatosService: ContatosService, private router: Router) { }

  // ngOnInit(): void {
  //   this.getContacts();
  //   //this.populationContacts();
  // }

  // // ngAfterViewInit(): void {
  // //   window.location.reload();
  // //   console.log('carregado');
  // // }

  // //métodopara preencher os contatos com dados macodos
  // // populationContacts() {
  // //   for (let i = 0; i < this.collection.count; i++) {
  // //     this.collection.data.push({
  // //       id: i,
  // //       name: 'teste' + i,
  // //       email: 'email' + i + '@contactura.com',
  // //       phone: '(' + 0 + 8 + 1 + ')' + 9 + 1 + 1 + 1 + 1 + '-' + 1 + 1 + 1 + 1
  // //     });
  // //   }
  // //   this.contactsList = this.collection.data;
  // //   console.log(this.contactsList);
  // // }

  // //   load() {

  // //     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  // //       this.router.navigate(['lista-contatos']);
  // //     });
  // // }

  // // load() {
  // //   console.log('sessionStorage', sessionStorage);
  // //   (sessionStorage.refresh == 'true' || !sessionStorage.refresh)
  // //     && location.reload();
  // //   sessionStorage.refresh = false;
  // // }


  ngOnInit(): void {
    // this.populateContacts();
    this.getContacts();
  }

  getContacts() {
    this.contatosService.getContacts().subscribe(
      data => {
        this.contactsList = data;
        console.log(data);
      },
      error => {
        this.contactsList = [];
        console.log(error);
      }
    );
  }

  // método para preencher os contatos com dados mocados
  // populateContacts(){
  //   for (let i = 0; i < this.collection.count; i++) {
  //     this.collection.data.push({
  //       id: i,
  //       name: 'teste' + i,
  //       email: 'email' + i + '@contactura.com',
  //       phone: '(' + 0 + 8 +  1 + ')' + 9 + i + i + i + i + '-' + i + i + i + i
  //     });
  //   }
  //   this.contactsList = this.collection.data;
  //   // console.log(this.contactsList);
  // }

  editContatos(contatos: Contacts) {
    console.log('edit esta funcionando', contatos);
    this.contatosService.getContactsList(contatos);
    this.router.navigate(['/cadastro-contato']);
  }

  deleteContacts(contatos: Contacts) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Deseja memso deletar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contatosService.deleteContacts(contatos.id).subscribe(
          data => {
            Swal.fire(
              String(data),
            );
            this.getContacts();
          }
        );
      }
    });
  }


}
