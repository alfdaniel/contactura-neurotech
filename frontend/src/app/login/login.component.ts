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

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('olá, componente iniciado')
    document.querySelector('html').style.background = 'linear-gradient(to right, red , blue)'
  }

  ngOnDestroy() {
    document.querySelector('html').style.background = 'none'
  }

  login() {
    if (this.loginForm.valid) {
      localStorage.setItem('token', 'coxinhanovaiorkina');
      localStorage.setItem('admin', 'true');
      this.router.navigate(['/lista-contatos']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'Login ou senha Inválidos'
      });
    }
  }
}
