import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDisplay',
})
export class TimeDisplayPipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    let minutes = '';
    const hours = `${value} hour `;
    if (value % 1 != 0) {
      minutes = `${(value % 1) * 60} minutes`;
      if (value < 1) {
        return minutes;
      }
    }
    return hours + minutes;
  }
}
