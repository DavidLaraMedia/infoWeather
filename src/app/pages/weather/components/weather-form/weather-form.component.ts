import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {

  cities = [
    {name: 'Buenos Aires'},
    {name: 'Caracas'},
    {name: 'Maturin'},
    {name: 'Cordoba'},
    {name: 'dsfgsdfghd'}
  ];

  form: FormGroup;

  constructor(private weatherService: WeatherService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      city: [''],
      includeHistory: false
    })
   }

  ngOnInit(): void {
  }

  callApi() {
    this.weatherService.getWeather(this.form.get('city')?.value, this.form.get('includeHistory')?.value);
  }


}
