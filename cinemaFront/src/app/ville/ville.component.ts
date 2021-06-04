import { Component, OnInit } from '@angular/core';
import {VilleService} from '../services/ville.service';
import {Ville} from '../model/Ville.model';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {
   ville: Ville;
   Nomville: string;
   villes:  Ville [];
   search: string;

  constructor(public villeService:VilleService) { }

  ngOnInit(): void {
    this.findAllVilles();
  }
    onSaveVille(formData) {

      if (this.ville == undefined) {
        // save
        this.ville = formData;
      } else {
        // update
        this.ville.name = this.Nomville;

      }
      console.log(this.ville);

      this.villeService.saveVille(this.ville).subscribe(
        (response)=> {
          this.findAllVilles()
          console.log(response);
        }, error =>{
          console.log(error);
        }
      );
      this.Nomville = '';
      this.ville = undefined;
    }


    onUpdateville(id) {
      console.log(id);
      this.villeService.findVilleById(id).subscribe(
        data => {
          this.ville = data;
          this.Nomville = this.ville.name;
        }, error => {
          console.log(error);

        });

    }
    onDeleteville(id) {
      this.villeService.deleteVille(id).subscribe(
        response => {
          this.findAllVilles()
        }, error => {
          console.log(error);

        }
      );
    }
  onSearch() {
    console.log(this.villes);
    let VilleObj = this.villes.find(ville => ville.name === this.search)
    if (VilleObj) {
      this.villes = [];
      this.villes.push(VilleObj);
    }
  }
  findAllVilles() {
    this.villeService.getVilles().subscribe(
      data => {
        this.villes = data;
        // console.log(this.cities);

      }, error => {
        console.log(error);
      }
    )
  }



}
