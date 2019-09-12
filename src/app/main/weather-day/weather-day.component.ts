import { Component, OnInit, Input } from '@angular/core';
import { Weather } from 'src/app/shared/weather.model';


@Component({
  selector: 'app-weather-day',
  templateUrl: './weather-day.component.html',
  styleUrls: ['./weather-day.component.css']
})
export class WeatherDayComponent implements OnInit {
  @Input() weather: Weather;
  day;

  weekday = ["Sun","Mon", "Tue","Wed","Thu","Fri","Sat"];

  constructor() { }

  ngOnInit() {
    console.log(typeof(this.weather.date))
    this.day = this.weekday[this.weather.date.getDay()];//this.weather.date.getDay()
  }

}
