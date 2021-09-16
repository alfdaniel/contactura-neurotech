import Swal from 'sweetalert2';
import { UsuariosService } from './../service/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss']
})
export class FormUsuariosComponent implements OnInit, OnDestroy {
  user: User;

  formUser = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    admin: new FormControl('')

  })

  //add: [];

  constructor(private router: Router, public usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.botaoEdit.subscribe(edit => {
      if (edit !== null) {
        this.user = edit;
        this.formUser.get('name').setValue(edit.name);
        this.formUser.get('username').setValue(edit.username);
        this.formUser.get('password').setValue(edit.password);
        this.formUser.get('id').setValue(edit.id);
        this.formUser.get('admin').setValue(edit.admin);
      }
    })
  }


  ngOnDestroy() {
    
    this.formUser.reset();
    console.log('adeus');

  }


  validation() {
    if (this.formUser.valid) {
      if (this.user) {
        console.log('editado');
        this.edit(this.user);
      } else {
        console.log('criado');
        this.create();
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ooooops..',
        text: 'Cadastro não realizado, ' +
          'preencha corretamente todos os campos'
      });
    }
  }

  edit(user: User) {
    user.name = this.formUser.get('name').value;
    user.username = this.formUser.get('username').value;
    user.password = this.formUser.get('password').value;
    user.admin = this.formUser.get('admin').value;
    this.usuariosService.updateUsers(user).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Eeeeeba..',
          text: 'Usuário editado com sucesso!'
        });
        //this.resetaform;
        this.router.navigate(['lista-usuarios']);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops..',
          text: 'Erro ao editar usuário!'
        });
      }
    );
  }

  create() {
    this.usuariosService.createUsers(this.formUser.value).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Eeeeeba..',
          text: 'Usuário criado com sucesso!'
        });
        this.router.navigate(['lista-usuarios']);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops..',
          text: 'Erro ao criar usuário!'
        });
      }
    );
  }

  cancelar() {
    this.router.navigate(['lista-usuarios'])
  }

  resetaform(user: User){
    user.id =  null,
   user.admin = null,
   user.name = null,
   user.password = null,
   user.username = null
  }

}
