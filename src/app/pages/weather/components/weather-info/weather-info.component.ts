import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {

  infoWeather$ = this.weatherService.infoWeather$;
  loading$ = this.weatherService.loading$;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

}
