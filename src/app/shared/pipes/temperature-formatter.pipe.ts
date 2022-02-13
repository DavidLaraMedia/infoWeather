import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureFormatter'
})
export class TemperatureFormatterPipe implements PipeTransform {

  transform(value: number | null): string | null {
    if (value) return  `${value}°C`;  
    return null;
  }
}
