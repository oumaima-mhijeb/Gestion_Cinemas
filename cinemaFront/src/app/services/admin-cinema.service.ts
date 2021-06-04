import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminCinemaService {
  public host:string="http://localhost:8082"

  constructor(private http:HttpClient) { }


  public getVilles(){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With,Authorization,Origin,Accept',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
     'Access-Control-Allow-Methods': 'GET,POST, OPTIONS',
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(this.host+"/villes",requestOptions);
  }

  getCinemas(v: any) {
    return this.http.get(v._links.cinemas.href)
  }

  getSalles(c) {
    return this.http.get(c._links.salles.href)
  }


  getProjections(salle: any) {
    let url=salle._links.projections.href.replace("{?projection}","");
    return this.http.get(url+"?projection=p1");
  }
}
