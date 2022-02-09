import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor( private httpClient: HttpClient) { }

  apiKey = '55479e582273fbb6bfc3674c34421253';
  city = 'Caracas';
  url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`


  getWeather(query: string) {
    this.httpClient.get(this.url).subscribe(res => {console.log(res)})
  } 
}
