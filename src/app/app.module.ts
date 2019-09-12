import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CollapseDirective } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherDayComponent } from './main/weather-day/weather-day.component';
import { FaviritItemComponent } from './favorites/favirit-item/favirit-item.component';
import { LoadSpinnerComponent } from './shared/load-spinner/load-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CollapseDirective,
    MainComponent,
    FavoritesComponent,
    PageNotFoundComponent,
    WeatherDayComponent,
    FaviritItemComponent,
    LoadSpinnerComponent 
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
