import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CinemaComponent} from './cinema/cinema.component';
import {AdminCinemaComponent} from './admin-cinema/admin-cinema.component';
import {VilleComponent} from './ville/ville.component';
import {CinemasComponent} from './cinemas/cinemas.component';
import {SalleComponent} from './salle/salle.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {
    path: "cinema",
    component:CinemaComponent
  },
  {
    path: "admin/cinema",
    component:AdminCinemaComponent
  },
  {
    path: "admin/cinema/ville",
    component:VilleComponent
  },
  {
    path: "admin/cinema/cinemas",
    component:CinemasComponent
  },
  {
    path: "admin/cinema/salles",
    component:SalleComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {path: '', redirectTo: 'cinema', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
