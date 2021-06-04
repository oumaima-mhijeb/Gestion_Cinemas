import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CinemaModel} from '../model/Cinema.model';
import {Ville} from '../model/Ville.model';

@Injectable({
  providedIn: 'root'
})
export class CinemasService {
  host = "http://localhost:8082/cinemas";
  villeUrl: string = "http://localhost:8082/villes";
  constructor(public http: HttpClient) { }
  saveCinema(cinema,villeId) {
    cinema.ville = {ville: `${this.villeUrl}/${villeId}`};
    console.log('cine')
    console.log(cinema.ville)
    return this.http.post(this.host, cinema);
  }

  findCinemasByVilleId(id) {
    return this.http.get<onGetResponseCinemas>(`${this.host}/search/findByVilleId?id=${id}`)
      .pipe(
        map( response=> response._embedded.cinemas)
      );
  }


  deleteCinema(id, city) {
    const urlForDeleteCinema = `http://localhost:8082/deleteCinemas/${id}/${city.id}`;
    return this.http.delete(`${urlForDeleteCinema}`);
  }


  findCinemaById(id) {
    return this.http.get<CinemaModel>(`${this.host}/${id}`);
  }
  findVilleById(id) {
    return this.http.get<Ville>(`${this.villeUrl}/${id}`);
  }
}

interface onGetResponseCinemas {
  _embedded: {
    cinemas: CinemaModel[]
  }
}
