import { element } from 'protractor';
import  Swal from 'sweetalert2';
import { UsuariosService } from './../service/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss']
})
export class FormUsuariosComponent implements OnInit {
user: User = null;
formUser = new FormGroup({
  id: new FormControl(''),
  name: new FormControl('', [Validators.required]),
  username: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required])
})

  constructor(private router: Router, public usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.botaoEdit.subscribe(edit => {
      if (edit !== null){
        console.log(edit, 'valor do edit');
        this.formUser.get('name').setValue(edit.name);
        this.formUser.get('username').setValue(edit.username);
        this.formUser.get('password').setValue(edit.password);
        //this.formUser.reset();
      }
    });
  }
  

  save(){
    console.log('form');
    if(this.formUser.valid){
      Swal.fire({
        icon: 'success',
        title: 'Eeeeeba..',
        text: 'Usuário criado com sucesso!'
      });
      this.formUser.reset();
      this.router.navigate(['/lista-usuarios']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ooooops...',
        text: 'Cadastro não realizado, ' +
        'preencha corretamente todos os campos'
      });
    }
  }
  
  cancelar(){
    this.formUser.reset();
    this.router.navigate(['/lista-usuarios'])
  }



}
