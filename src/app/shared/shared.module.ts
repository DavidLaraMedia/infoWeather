import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureFormatterPipe } from './pipes/temperature-formatter.pipe';



@NgModule({
  declarations: [
    TemperatureFormatterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TemperatureFormatterPipe
  ]
})
export class SharedModule { }
