import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InfoWeather, WeatherService } from 'src/app/services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-history-table',
  templateUrl: './weather-history-table.component.html',
  styleUrls: ['./weather-history-table.component.css']
})

export class WeatherHistoryTableComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['country', 'cityName', 'temp', 'fellsLike'];
  cityHistory: InfoWeather[] = [];
  dataSource = new MatTableDataSource();
  subscription!: Subscription;

  constructor(private weatherService: WeatherService) { }
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.subscription = this.weatherService.cityHistory$.subscribe((history: InfoWeather[]) => {
      this.dataSource.data = history;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
