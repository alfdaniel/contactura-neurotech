import { ListaContatosComponent } from './../../lista-contatos/lista-contatos.component';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
        
        //document.querySelector('html').style.background = 'url(../../assets/img/LIST CONTACTURA.png)'
  }

  listCont(){
    this.router.navigate(['/lista-contatos'])
  }  

}
