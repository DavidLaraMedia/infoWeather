import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {

  form: FormGroup;

  constructor(private weatherService: WeatherService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      city: ['', Validators.required],
      includeHistory: false
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.weatherService.getWeather(this.form.get('city')?.value, this.form.get('includeHistory')?.value);
    }
  }


}
