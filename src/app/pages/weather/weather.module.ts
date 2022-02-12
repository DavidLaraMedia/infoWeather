import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherFormComponent } from './components/weather-form/weather-form.component';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';
import { WeatherHistoryTableComponent } from './components/weather-history-table/weather-history-table.component';

@NgModule({
  declarations: [
    WeatherComponent,
    WeatherFormComponent,
    WeatherInfoComponent,
    WeatherHistoryTableComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatProgressBarModule
  ]
})
export class WeatherPageModule { }
