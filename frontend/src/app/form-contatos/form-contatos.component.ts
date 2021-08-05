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
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, public contatosService: ContatosService) { }

  ngOnInit(): void {
    this.contatosService.botaoEdit.subscribe(edit => {
      if (edit !== null) {
        console.log(edit, 'valor do edit');
        this.formContatos.get('name').setValue(edit.name);
        this.formContatos.get('phone').setValue(edit.phone);
        this.formContatos.get('email').setValue(edit.email);
        //this.formContatos.get('name').setValue(edit.name);
      }
    });
  }

  save() {
    console.log('form');
    if (this.formContatos.valid){
      Swal.fire({
        icon: 'success',
        title: 'Eeeeeba..',
        text: 'Contato criado com sucesso!'
      });
      // this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      //   this.router.navigate(['/lista-contatos']));
      this.router.navigate(['/lista-contatos']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ooooops...',
        text: 'Cadastro não realizado, ' +
          'preencha corretamente todos os campos'
      });
    }
  }

}