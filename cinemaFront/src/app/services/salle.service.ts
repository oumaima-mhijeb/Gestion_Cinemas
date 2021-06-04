import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CinemaService} from './cinema.service';
import {SalleModel} from '../model/Salle.model';
import {Ville} from '../model/Ville.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  SalleUrl: string = "http://localhost:8082/salles";
  cinemaUrl: string = "http://localhost:8082/cinemas";

  constructor(public http: HttpClient,
              public cinemaService: CinemaService) {

  }

  findSalleById(id: any) {
    return this.http.get<SalleModel>(`${this.SalleUrl}/${id}`);

  }
  findSallesByIdCinema(id){
    return this.http.get<getResponseSalle>(`${this.SalleUrl}/search/findByCinemaId?id=${id}`)
      .pipe(
        map( response=> response._embedded.salles)
      );
  }
  saveSalle(Salle: SalleModel) {
    let cinemaId = Salle.cinema.id;
    // return this.http.post(`${this.cinemaUrl}/${cinemaId}/salles`, Salle);
    return this.http.post(`${this.SalleUrl}`, Salle);
  }

  saveSalleInCinemaDetail(formData, cinemaId) {
    formData.cinema = {cinema: `${this.cinemaUrl}/${cinemaId}`};

    return this.http.post(`${this.SalleUrl}`, formData);
  }

  getCountSalle(cinemaId) {
    const url = `${this.SalleUrl}/search/countByCinemaId?cinemaId=${cinemaId}`
    return this.http.get(url);
  }

   deleteSalle(id) {
    if (confirm('are you sure ?')) {
      //let count=this.getCountSalle(cinema.id)
      return this.http.delete(`${this.SalleUrl}/${id}`);
    }
  }
}
  interface getResponseSalle {
  _embedded: {
    salles: SalleModel[]
  }

}
