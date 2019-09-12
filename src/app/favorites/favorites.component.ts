import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../shared/favorites.service';
import { Location } from '../shared/location.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  
  constructor(private favoritesService: FavoritesService) { }
  favorites : Location[]= [];

  ngOnInit() {
    this.favorites = this.favoritesService.getFavorites();
    console.log(this.favorites);
    this.favoritesService.favoritesChanged.subscribe((locations: Location[])=>{
      this.favorites = locations;
    })
  }
}
