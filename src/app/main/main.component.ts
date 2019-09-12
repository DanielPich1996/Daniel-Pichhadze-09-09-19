import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Location } from '../shared/location.model';
import { Weather } from '../shared/weather.model';
import { FavoritesService } from '../shared/favorites.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  locationErr = null;
  weatherErr = null;
  isFavorit = false;
  locationStr = "Tel Aviv";
  locationOptions : any = [];
  location : Location = null;
  weather : Weather = null;
  weatherArray: Weather[] = [];
  loadState;
  
  constructor(private apiService: ApiService,
              private favoritesService: FavoritesService,
              private route: ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    if(this.route.params['city'] != null){
      this.locationStr = this.route.params['city'];
    }
    this.setComponent()

    this.route.params.subscribe((params: Params) => {     
      if(params['city'] != null ){
        this.locationStr = params['city'];
      }  
      this.setComponent()
    });
  }
  
  setComponent(){
    this.location = this.favoritesService.getFavorit(this.locationStr);

    if(this.location == null){
      this.router.navigate(['/main/Tel Aviv']);
    }else{
      this.getweather()
    }
  }

  getweather(){
    this.loadState = true;

    this.weatherErr = null;
    this.isFavorit = this.favoritesService.isFavorit(this.location);

    this.apiService.getWeather(this.location).subscribe((data: Weather) =>{      
      this.weather = data;
      this.loadState = false;
    }, err => {
      console.log(err)
      this.loadState = false;
      this.weather = null;
      this.weatherErr = "Somthisng went wrong cant get weather please tray again";
    });

    this.apiService.getMoreWeather(this.location).subscribe((data: Weather[]) => {
      this.weatherArray = data;
      console.log(this.weatherArray)
      this.loadState = false;
    },err =>{
      this.loadState = false;
      this.weatherErr = "Somthisng went wrong cant get 5 day weather tray again";
    });
  }
  

  autocomplete(form: NgForm){
    let isFound = false;
    this.locationErr = null;
    console.log(form)

    if (form.valid) {
      
      for(let loc of this.locationOptions){
        if (String(loc.name).toLocaleLowerCase() == 
            this.locationStr.toLocaleLowerCase()){
          this.location = loc;
          console.log(this.location);
          isFound = true;
          this.getweather();
        }
      } 

      if (!isFound){
        this.apiService.getLocation(this.locationStr).subscribe((data: Location[]) => {
          this.locationOptions = data;
          if (data.length < 1){
            this.locationErr = " No cities found tray another city "
          }
          console.log(data)
        }, err => {
          console.log(err)
          this.locationOptions =[];
          this.locationErr = " Cannot get locations ";
        });
      } 
    } else{
      this.locationErr = 'Use only english letters';
    }
    
  }

  onAddFavorit(){
    if(this.isFavorit){
      this.favoritesService.removeFavorit(this.location);
    } else{
      this.favoritesService.addFavorit(this.location);
    }
    this.isFavorit = !this.isFavorit;
  }
}
