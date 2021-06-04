import { Component, OnInit } from '@angular/core';
import {CinemaService} from '../services/cinema.service';
import {CinemaModel} from '../model/Cinema.model';
import {CinemasService} from '../services/cinemas.service';
import {VilleService} from '../services/ville.service';
import {Ville} from '../model/Ville.model';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.css']
})
export class CinemasComponent implements OnInit {
  public Cinema: CinemaModel;
  public nbreSalles: string;
  public NomCinema: string;
  public villes: Ville[]
  public villeId: number;
  public cines: CinemaModel[];
  public Ville: Ville;
  public isShow: boolean=true;

  constructor(public cinemasService: CinemasService,public villeService:VilleService) {
  }

  ngOnInit(): void {
    this.findAllVilles();

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

  onSaveCinema(dataForm) {

    if (this.Cinema == undefined) {
      // add
      this.findVille(dataForm.ville)
      setTimeout(()=>{console.log(dataForm)
        this.Cinema=dataForm
        this.Cinema.ville=this.Ville
        console.log('this')
        console.log(this.Cinema)},2000)

    } else {
      // update
      this.findVille(this.villeId)
      setTimeout(()=>{this.Cinema.name = this.NomCinema;
        let nombreSalles=Number(this.nbreSalles)
        this.Cinema.nombreSalles=nombreSalles
        this.Cinema.ville=this.Ville
        console.log(this.Cinema)},2000)

    }
    setTimeout(()=>{this.cinemasService.saveCinema(this.Cinema,this.Ville.id).subscribe(
      data => {
        this.findCinemabyVilleid()
        console.log(data);
      }, error => {
        console.log(error);

      }
    );

      this.NomCinema='';
      this.nbreSalles='';
      this.Cinema = undefined;},2000)
  }

  onDeleteCinema(id) {
    this.cinemasService.deleteCinema(id, this.Ville).subscribe(
      data => {
        this.cinemasService.findCinemasByVilleId(this.villeId).subscribe(
          data => {
            console.log(data);
            this.cines = data;
          }, error => {
            console.log(error);
          }
        );
      }, error => {
        console.log(error);
      }
    );
  }

  onUpdateCinema(id) {
    console.log(id);
    this.toggleDisplay();
    this.cinemasService.findCinemaById(id).subscribe(
      data => {
        this.Cinema = data;
        this.NomCinema = this.Cinema.name;
        this.nbreSalles = this.Cinema.nombreSalles.toString();
        this.Ville=this.Cinema.ville
        console.log(this.Cinema)
      }, error => {
        console.log(error);

      });

  }
  onSearchChange(event) {
    this.villeId = event.target.value;
    this.cinemasService.findCinemasByVilleId(this.villeId).subscribe(
      data => {
        console.log(data);
        this.cines = data;
      }, error => {
        console.log(error);
      }
    );
    this.villeService.findVilleById(this.villeId).subscribe(
      data => {
        console.log(data);
        this.Ville = data;
      }, error => {
        console.log(error);
      }
    );
  }
  toggleDisplay(){
    this.isShow=false
  }
  toggleReset(){
    this.isShow=true
  }
  findVille(id){
    this.villeService.findVilleById(id).subscribe(
      data => {
        console.log(data);
        this.Ville = data;
      }, error => {
        console.log(error);
      }
    );
  }
  findCinemabyVilleid(){
    this.cinemasService.findCinemasByVilleId(this.villeId).subscribe(
      data => {
        console.log(data);
        this.cines = data;
      }, error => {
        console.log(error);
      }
    );
  }





}
