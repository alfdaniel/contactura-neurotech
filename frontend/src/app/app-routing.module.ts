import { NotFoundComponent } from './sharedComponent/not-found/not-found.component';
import { FormUsuariosComponent } from './form-usuarios/form-usuarios.component';
import { FormContatosComponent } from './form-contatos/form-contatos.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AuthGuard, AuthAdminGuard } from './service/auth.guard';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'lista-contatos', component: ListaContatosComponent, canActivate: [AuthGuard]},
  { path: 'lista-usuarios', component: ListaUsuariosComponent, canActivate: [AuthGuard]},
  { path: 'cadastro-contato', component: FormContatosComponent, canActivate: [AuthGuard]},
  { path: 'cadastro-usuario', component: FormUsuariosComponent, canActivate: [AuthAdminGuard]},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }