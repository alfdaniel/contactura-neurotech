import { UsuariosService } from './../service/usuarios/usuarios.service';
import { Authentication } from './../models/user';
import { NavbarComponent } from './../sharedComponent/navbar/navbar.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  authentication: Authentication;

  constructor(private router: Router, public usuariosService: UsuariosService) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = 'linear-gradient(to right, red , blue)'
  }

  ngOnDestroy() {
    document.querySelector('html').style.background = 'none'
  }

  login() {
    if (this.loginForm.valid) {
      this.authentication = this.loginForm.value;
      this.usuariosService.authentication(this.authentication).subscribe(
        data => {
          console.log(data);
          localStorage.setItem('token', data.admin);
          localStorage.setItem('admin', data.token);
          localStorage.setItem('username', this.authentication.username);
          localStorage.setItem('password', this.authentication.password);
          this.router.navigate(['/lista-contatos']);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'Login ou senha Inválidos'
      });
    }
  }
}
