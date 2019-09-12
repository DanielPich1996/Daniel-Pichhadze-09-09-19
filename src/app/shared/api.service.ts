import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Location } from './location.model';
import { Weather } from './weather.model';





@Injectable({
  providedIn: 'root'
})
export class ApiService {
  weaterCash : {[key: string] : any} = {} ;
  moreWeaterCash: {[key: string] : any} = {};
  apiKey = '?apikey=5cWoGzsPjG9LZ7OWHTxV047G5wSvar9C';
  locationUrl = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete"+ this.apiKey + "&q=";
  weaterUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
  moreWeaterUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  iconUrl = "https://developer.accuweather.com/sites/default/files/";

  constructor(private http: HttpClient) { 
    var weaterCash = JSON.parse(localStorage.getItem('weaterCash'));
    if(weaterCash){
      this.weaterCash = weaterCash;
    }

    var moreWeaterCash = JSON.parse(localStorage.getItem('moreWeaterCash'));
    if(moreWeaterCash){
      this.moreWeaterCash = moreWeaterCash;
    }
  }

  getLocation(str: string ){
    return this.http.get(this.locationUrl + str).pipe(map((locs: any[]) => {
      return locs.map(x => new Location(x.Key, x.LocalizedName));
    }));
  }

  getWeather(location){
    if(this.weaterCash[location.key]){
      return new Observable(observer => {
        observer.next(this.weaterCash[location.key])
      })
      //return this.weaterCash[key]
    }
    return this.http.get(this.weaterUrl + location.key + this.apiKey).pipe(
      map((x : any) => {
        var weather = new Weather(x[0].WeatherText, 
                                  x[0].Temperature.Metric.Value, 
                                  this.iconUrl + (x[0].WeatherIcon > 9 ? x[0].WeatherIcon : '0'+ x[0].WeatherIcon ) + '-s.png', 
                                  location,
                                  new Date(x[0].LocalObservationDateTime));
        this.weaterCash[location.key] = weather;
        localStorage.setItem('weaterCash', JSON.stringify(this.weaterCash))
        return weather;
      })
    );
  }

  getMoreWeather(location) {
    if(this.moreWeaterCash[location.key]){
      return new Observable(observer => {
        observer.next(<any[]>this.moreWeaterCash[location.key].map((x : Weather) => {
          return new Weather(x.text, x.temperature, x.iconUrl, x.location, new Date(x.date.toString()))
        }))
      })
      //return this.moreWeaterCash[key];
    }

    return this.http.get(this.moreWeaterUrl + location.key + this.apiKey + "&details=false&metric=true" ).pipe(
      map((x : any) => {
        
        var moreWeater: Weather[] = x.DailyForecasts.map(day => {
          return new Weather(day.Day.IconPhrase, 
                      day.Temperature.Maximum.Value,
                      this.iconUrl + (day.Day.Icon > 9 ? day.Day.Icon : '0'+ day.Day.Icon ) + '-s.png',
                      location, 
                      new Date(day.Date));
        });
        this.moreWeaterCash[location.key] = moreWeater;
        localStorage.setItem("moreWeaterCash", JSON.stringify(this.moreWeaterCash))
        return moreWeater.slice();
      })
    );
  }
}
