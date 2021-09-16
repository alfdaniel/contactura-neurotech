import { Contacts } from './../models/contacts';
import { ContatosService } from './../service/contatos/contatos.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-contatos',
  templateUrl: './form-contatos.component.html',
  styleUrls: ['./form-contatos.component.scss']
})
export class FormContatosComponent implements OnInit {

  formContatos = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required])
    
  });

  contact: Contacts;

  constructor(private router: Router, public contatosService: ContatosService) { }

  ngOnInit(): void {
    this.contatosService.botaoEdit.subscribe(edit => {
      if (edit !== null) {
        console.log(edit, 'valor do edit');
        this.formContatos.get('name').setValue(edit.name);
        this.formContatos.get('phone').setValue(edit.phone);
        this.formContatos.get('email').setValue(edit.email);
        this.formContatos.get('id').setValue(edit.id);
      }
    });
  }

  // ngOnDestroy(){
  //     this.formContatos.reset();
  // }

  // load() {
    
  //     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //       this.router.navigate(['cadastro-contato']);
  //     });
  // }

  // load() {
    
  //   console.log('sessionStorage', sessionStorage);
  //   (sessionStorage.refresh == 'true' || !sessionStorage.refresh) 
  //       && location.reload();
  //   sessionStorage.refresh = false;
  // }

  save() {
    console.log('form');
    if (this.formContatos.valid){
      if (this.contact){
        this.edit(this.contact);
      }else{
        this.create();
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ooooops...',
        text: 'Cadastro não realizado, ' +
          'preencha corretamente todos os campos'
      });
    }
  }

  validation(){
    if (this.formContatos.valid){
      if (this.contact){
        this.edit(this.contact);
      }else{
        this.create();
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ooooops..',
        text: 'Cadastro não realizado,' +
        'preencha corretamente todos os campos'
      });
    }
  }

  edit(contact: Contacts){
    contact.name =  this.formContatos.get('name').value;
    contact.phone = this.formContatos.get('phone').value;
    contact.email =  this.formContatos.get('email').value;
    this.contatosService.updateContact(contact).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Eeeeeba..',
          text: 'Contato editado com sucesso!'
        });
        this.router.navigate(['/lista-contatos']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: 'Erro ao editar contato!'
          });
        }
    );
  }

  create(){
    this.contatosService.createContacts(this.formContatos.value).subscribe(
      data => {
        setTimeout(function(){
          Swal.fire({
            icon: 'success',
            title: 'Eeeeeba..',
            text: 'Contato criado com sucesso!',
            timer: 5000
          });
        },2000);
          this.router.navigate(['/lista-contatos']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: 'Erro ao criar contato!'
          });
        }
    );
  }

  cancelar() {
    this.router.navigate(['lista-contatos'])
  }

}