import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';

const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  @ViewChild('cd', { static: false })
  private countdown!: CountdownComponent;
  vacationDay = new Date('September 6, 2022 09:00:00');
  // vacationDay = new Date('May 20, 2022 09:00:00');
  timeDifference = this.vacationDay.getTime() - new Date().getTime();

  config: CountdownConfig = {
    leftTime: this.timeDifference / 1000,
    format: 'D:HH:mm:ss',
    formatDate: ({ date, formatStr }) => {
      let duration = Number(date || 0);

      return CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(
            new RegExp(`${name}+`, 'g'),
            (match: string) => {
              return v.toString().padStart(match.length, '0');
            }
          );
        }
        return current;
      }, formatStr);
    },
  };
  constructor() {}

  ngOnInit() {}
}
