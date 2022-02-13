import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  private infoWeatherDefault: InfoWeather = {
    country: '',
    cityName: '',
    temp: null,
    fellsLike: null
  };

  private infoWeather = new BehaviorSubject<InfoWeather>(this.infoWeatherDefault);
  infoWeather$ = this.infoWeather.asObservable();

  private cityHistory = new BehaviorSubject<InfoWeather[]>([]);
  cityHistory$ = this.cityHistory.asObservable();

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  private error = new BehaviorSubject<boolean>(false);
  error$ = this.error.asObservable();

  constructor(private httpClient: HttpClient) { }

  private readonly apiKey = environment.apiKey;
  private readonly WEATHER_HISTORY = 'WEATHER_HISTORY';

  getWeather(city: string, includeHistory: boolean) {
    this.error.next(false);
    this.loading.next(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;

    this.httpClient.get(url).pipe(catchError(e => { 
      // Cleaning state
      this.cityHistory.next([]);
      this.infoWeather.next(this.infoWeatherDefault);
      this.error.next(true);
      this.loading.next(false); 
      return throwError(() => e);
    }))
    .subscribe((res: any) => {
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
    const localHistory: InfoWeather[] = JSON.parse(localStorage.getItem(this.WEATHER_HISTORY) as any) || [];
    localHistory.push(info);
    localStorage.setItem(this.WEATHER_HISTORY, JSON.stringify(localHistory));
    const filterHistory = includeHistory ? localHistory.filter(iw => iw.cityName === info.cityName) : [];
    this.cityHistory.next(filterHistory);
  }
}
