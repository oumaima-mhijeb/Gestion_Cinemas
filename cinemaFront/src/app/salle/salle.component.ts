import { Component, OnInit } from '@angular/core';
import {CinemaModel} from '../model/Cinema.model';
import {VilleService} from '../services/ville.service';
import {SalleService} from '../services/salle.service';
import {CinemasService} from '../services/cinemas.service';
import {Ville} from '../model/Ville.model';
import {SalleModel} from '../model/Salle.model';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit {
  NomSalle:String;
  villes:Ville[];
  idVille:number;
  idCinema:number;
  cinemas: CinemaModel[];
  Salles:SalleModel[];
  Cinema:CinemaModel;
  Salle:SalleModel;
  NombrePlace:string;
  constructor(public cinemasService: CinemasService,
              public villeService: VilleService,
              public salleService: SalleService) { }

  ngOnInit(): void {
    this.findAllVilles();

  }
  OnSaveSalle(formData) {
    console.log(formData);
    this.Salle=formData;
    let nbr=Number(formData.nombrePlace)
    this.Salle.nombrePlace=nbr
    this.salleService.saveSalleInCinemaDetail(this.Salle,formData.cinema).subscribe(
      data => {
        // this.villes = data;
        alert('Salle ajouté avec  succes')
        // this.findAllSallesByCinemaId(cinemaId);
      }, error => {
        console.log(error);
      }
    );
  }


  findAllVilles() {
    this.villeService.getVilles().subscribe(
      data => {
        this.villes = data;
      }, error => {
        console.log(error);
      }
    );
  }
  onVilleChange(event) {
    this.idVille = event.target.value;
    this.cinemasService.findCinemasByVilleId(this.idVille).subscribe(
      data => {
        this.cinemas = data;
      }, error => {
        console.log(error);
      }
    );
  }


  onCinemaChange(event) {
    console.log(event.target.value);
    this.idCinema = event.target.value;

  }
  onSearchChange(event) {
    console.log(event.target.value);
    this.idCinema = event.target.value;
    this.salleService.findSallesByIdCinema(this.idCinema).subscribe(
      data => {
        console.log(data);
        this.Salles = data;
      }, error => {
        console.log(error);
      }
    );
    this.cinemasService.findCinemaById(this.idCinema).subscribe(
      data => {
        console.log(data);
        this.Cinema = data;
      }, error => {
        console.log(error);
      }
    );
  }
}
