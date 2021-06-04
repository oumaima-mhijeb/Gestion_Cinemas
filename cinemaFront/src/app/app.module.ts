import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CinemaComponent } from './cinema/cinema.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AdminCinemaComponent } from './admin-cinema/admin-cinema.component';
import { VilleComponent } from './ville/ville.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { SalleComponent } from './salle/salle.component';
import { LoginComponent } from './login/login.component';
import {HttpInterceptorService} from './services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    CinemaComponent,
    AdminCinemaComponent,
    VilleComponent,
    CinemasComponent,
    SalleComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
