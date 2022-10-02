import { weekDays } from 'app/app.component';

export class Chore {
  name!: string;
  often!: number;
  dayOfTheWeek?: weekDays;
  time!: number;
  next!: Date;
  lastDone!: Date | null;
  select?: string;
  key?: string;
  constructor(input: any) {
    input.next = input.next ? new Date(input.next) : '';
    return Object.assign(this, input);
  }
}
