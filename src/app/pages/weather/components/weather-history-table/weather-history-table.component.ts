import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-history-table',
  templateUrl: './weather-history-table.component.html',
  styleUrls: ['./weather-history-table.component.css']
})
export class WeatherHistoryTableComponent implements OnInit {
  displayedColumns: string[] = ['country', 'ciudad', 'clima', 'ST'];
  dataSource$ = this.weatherService.cityHistory$;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

}
