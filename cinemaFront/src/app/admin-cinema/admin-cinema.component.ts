import { Component, OnInit } from '@angular/core';
import {CinemaService} from '../services/cinema.service';
import {AdminCinemaService} from '../services/admin-cinema.service';
import {SalleService} from '../services/salle.service';
import {SalleModel} from '../model/Salle.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-admin-cinema',
  templateUrl: './admin-cinema.component.html',
  styleUrls: ['./admin-cinema.component.css']
})
export class AdminCinemaComponent implements OnInit {
  public villes;
  public cinemas;
  public currentVilles;
  public currentCinema;
  public currentSalle;
  public salles;
  public currentProjection;
  public idCinema: number;
  public selectedupdate=0;
  public NomSalle: string="";
  public NombrePlace:string;
  public mysalle: SalleModel;
  public isShow: boolean=false;
  constructor(public adminCinemaService:AdminCinemaService,public salleService:SalleService) { }

  ngOnInit(): void {
    this.adminCinemaService.getVilles()
      .subscribe(data=>{
        this.villes=data;
      },error => {
        console.log(error);
      })
  }

  ongetVille(){
    this.adminCinemaService.getVilles()
    .subscribe(data=>{
      this.villes=data;
    },error => {
      console.log(error);
    })
  }
  onGetCinemas(v) {
    this.currentVilles=v;
    this.salles=undefined;
    this.adminCinemaService.getCinemas(v)
      .subscribe(data=>{
        this.cinemas=data;
      },error => {
        console.log(error);
      })
  }

  onGetSalles(c) {
    this.currentCinema=c;
    this.adminCinemaService.getSalles(c)
      .subscribe(data=>{
        this.salles=data;
        this.salles._embedded.salles.forEach(salle=>{
          this.adminCinemaService.getProjections(salle)
            .subscribe(data=>{
              salle.projections=data;
            },error => {
              console.log(error);
            })
        })
      },error => {
        console.log(error);
      })
  }
  onSaveSalle(formData,cinema) {
   //console.log(formData);
    if (this.mysalle == undefined) {
      // savE
      this.mysalle = formData
      this.mysalle.cinema=cinema
    } else {
      // update
      this.mysalle.name = this.NomSalle;
      let mesplaces:number=Number(this.NombrePlace)
      this.mysalle.nombrePlace=mesplaces
      this.mysalle.cinema=cinema
     // console.log(this.mysalle);
    }
    console.log(this.mysalle);
    this.salleService.saveSalleInCinemaDetail(this.mysalle,cinema.id).subscribe(
      (response)=> {
        this.onGetSalles(cinema)
        console.log(response);
      }, error =>{
        console.log(error);
      }
    );
    this.NomSalle = '';
    this.NombrePlace='';
    this.mysalle = undefined;
  }

    onUpdateSalle(id,cinema) {
     this.toggleDisplay()
      this.currentCinema=cinema
      this.selectedupdate=1
      this.salleService.findSalleById(id).subscribe(
        data => {
          this.mysalle = data;
          this.currentSalle=data
         // console.log(data)
          this.mysalle.cinema=cinema
          //console.log(this.mysalle)
          this.NomSalle= this.mysalle.name;
          this.NombrePlace=(this.mysalle.nombrePlace).toString()
        }, error => {
          console.log(error);

        });

    }
    toggleDisplay(){
   this.isShow=!this.isShow;
    }
    tooggleDisplayOnsubmit(){
      setTimeout(()=>{this.isShow=!this.isShow;},1000)
    }
  onDeleteSalle(id,cinema) {
    this.salleService.deleteSalle(id).subscribe(
      response => {
        this.onGetSalles(cinema)
      }, error => {
        console.log(error);

      }
    );
  }

}
