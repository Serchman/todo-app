import { Pipe, PipeTransform } from '@angular/core';
import { NameValueInterface } from 'app/app.component';
import { Chore } from 'app/models/chore';
import { TimeDisplayPipe } from 'app/pipes/time-display.pipe';

export const daysToString = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

@Pipe({
  name: 'taskDisplay',
})
export class TaskDisplayPipe implements PipeTransform {
  dateDisplays = ['next', 'lastDone'];
  timeDisplay = new TimeDisplayPipe();
  transform(value: [Chore, NameValueInterface], ...args: any[]): any {
    const element = value[0];
    const column = value[1].value;
    if (this.dateDisplays.includes(column) && element[column]) {
      const date: Date = element[column] as Date;
      return date.toLocaleDateString('en-GB');
    }
    if (column === 'time') {
      return this.timeDisplay.transform(element.time);
    }
    return element[column];
  }
}
