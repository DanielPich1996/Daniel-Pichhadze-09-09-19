import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Weather } from 'src/app/shared/weather.model';
import { Location } from 'src/app/shared/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favirit-item',
  templateUrl: './favirit-item.component.html',
  styleUrls: ['./favirit-item.component.css']
})
export class FaviritItemComponent implements OnInit {
  @Input()location :Location;
  weather : Weather;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getWeather(this.location).subscribe((data: Weather) =>{      
      this.weather = data;
      console.log(this.weather)
    }, err => {
      console.log(err)
    });
  }

  goToMain(){
    this.router.navigate(['/main/' +  this.location.name]);
  }

}
