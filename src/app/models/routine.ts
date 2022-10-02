export class Routine {
  name!: string;
  time!: 'day' | 'night';
  steps!: RoutineStep[];

  constructor(input: any) {
    input.next = input.next ? new Date(input.next) : '';
    return Object.assign(this, input);
  }
}

export interface RoutineStep {
  name: '';
  product: '';
  next?: Date;
}
