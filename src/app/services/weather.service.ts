import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface InfoWeather {
  country: string,
  cityName: string;
  temp: number | null;
  fellsLike: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private infoWeather = new BehaviorSubject<InfoWeather>({
    country: '',
    cityName: '',
    temp: null,
    fellsLike: null
  });
  infoWeather$ = this.infoWeather.asObservable();

  private cityHistory = new BehaviorSubject<InfoWeather[]>([]);
  cityHistory$ = this.cityHistory.asObservable();

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  private errorLoading = new BehaviorSubject<boolean>(false);
  errorLoading$ = this.errorLoading.asObservable();

  constructor(private httpClient: HttpClient) { }

  apiKey = environment.apiKey;

  getWeather(city: string, includeHistory: boolean) {
    this.loading.next(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
    this.httpClient.get(url).subscribe((res: any) => {
      const myRes: InfoWeather = {
        country: res.sys.country,
        cityName: res.name,
        temp: res.main.temp,
        fellsLike: res.main.feels_like
      };
      this.infoWeather.next(myRes);
      this.historyWeatherHandler(myRes, includeHistory);
      this.loading.next(false);
    })
  }

  private historyWeatherHandler(info: InfoWeather, includeHistory: boolean) {
    // Save into Local Stoage
    const localHistory: InfoWeather[] = JSON.parse(localStorage.getItem('WEATHER_HISTORY') as any) || [];
    localHistory.push(info);
    localStorage.setItem('WEATHER_HISTORY', JSON.stringify(localHistory));
    const filterHistory = includeHistory ? localHistory.filter(iw => iw.cityName === info.cityName) : [];
    this.cityHistory.next(filterHistory);
  }
}
