import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ville} from '../model/Ville.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  host = "http://localhost:8082/villes";

  constructor(public http: HttpClient) {
  }

  saveVille(ville) {
    return this.http.post(this.host, ville);
  }

  public getVilles() {
    return this.http.get<getResponceCities>(this.host).pipe(
      map(response => response._embedded.villes)
    );
  }

  public deleteVille(id) {
    if (confirm('are you sure ?')) {
      return this.http.delete(`${this.host}/${id}`);
    }
  }

  public findVilleById(id) {
    return this.http.get<Ville>(`${this.host}/${id}`);
  }
}
  interface getResponceCities {
  _embedded: {
    villes: Ville[]
  }

  }



