import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather/weather.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    MatButtonModule
  ]
})
export class WeatherPageModule { }
