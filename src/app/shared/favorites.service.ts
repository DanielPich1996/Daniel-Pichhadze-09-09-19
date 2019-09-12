import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Location } from './location.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favoritesChanged = new Subject<any[]>();
  favorites: [string,Location][] = []
  
  constructor() { 
    this.favorites["Tel Aviv"] = new Location("215854" ,"Tel Aviv")
  }
  
  addFavorit(location:Location){
    this.favorites[location.name] = location;
    this.favoritesChanged.next(<Location[]><unknown>Object.values(this.favorites));
  }

  isFavorit(location:Location){
    if(this.favorites[location.name]){
      return true;
    }
    return false;
  }

  removeFavorit(location:Location){
    delete this.favorites[location.name];
    this.favoritesChanged.next(<Location[]><unknown>Object.values(this.favorites));
  }

  getFavorites():Location[]{
    return <Location[]><unknown>Object.values(this.favorites);
  }

  getFavorit(key: string) : Location {
    return this.favorites[key];
  }
}
