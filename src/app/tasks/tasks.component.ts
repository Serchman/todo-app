import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { AddTaskComponent } from 'app/add-task/add-task.component';
import { NameValueInterface } from 'app/app.component';
import { Chore } from 'app/models/chore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TasksComponent implements OnInit {
  tasks$!: Observable<any>;

  items = ['Todo', 'Upcoming'];
  todaysTodo: Chore[] | any;
  sortedTodos = [];
  upcomingTodos: Chore[] | any;
  today: any;

  displayedColumns: NameValueInterface[] = [
    { name: 'Name', value: 'name' },
    { name: 'Next', value: 'next' },
    { name: 'Time it takes', value: 'time' },
    // { name: 'Interval (In days)', value: 'often' },
    // { name: 'Last Done', value: 'lastDone' },
  ];
  columnsToDisplay = ['select', 'name', 'time'];
  upcomingColumns = [...this.displayedColumns.map((column) => column.value)];

  tasksDB;
  expandedElement: any;
  keyData!: any[];

  constructor(db: AngularFireDatabase, public dialog: MatDialog) {
    this.tasksDB = db.list<Chore>('/Tasks');
    this.tasksDB
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => (this.keyData = data));

    this.tasks$ = this.tasksDB.valueChanges().pipe(
      map((tasks: Chore[]) => {
        return tasks.map((task) => new Chore(task));
      })
    );
  }

  ngOnInit(): void {
    this.today = new Date().getDay();

    this.tasks$
      .pipe(
        map((tasks: any) => {
          const todaysTasks = tasks.filter((task: Chore) => {
            return !task.next || task.next.getTime() <= new Date().getTime();
          });
          return todaysTasks;
        })
      )
      .subscribe((data) => {
        this.todaysTodo = data;
        this.sortedTodos = this.todaysTodo;
      });
    this.upcomingTodos = this.tasks$.pipe(
      map((tasks: any) => {
        const todaysTasks = tasks.filter(
          (task: Chore) =>
            task.next && task.next.getTime() > new Date().getTime()
        );
        return todaysTasks;
      })
    );
  }

  setTaskDone(event$: Event, task: Chore) {
    event$.stopPropagation();
    const choreWithKey = this.keyData.filter(
      (data) => data.name === task.name
    )[0];
    const keyToUpdate = choreWithKey.key;
    this.tasksDB.update(keyToUpdate, {
      ...task,
      next: this.addDays(new Date(), task.often),
    });
  }

  addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  openTaskDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (!result.value) {
        return;
      }
      const values = result.value;

      const chore = {
        name: values.name,
        often: values.interval,
        time: values.time,
        next: new Date(),
        lastDone: null,
      };
      this.tasksDB.push(chore);
    });
  }

  sortData(sort: Sort) {
    const data = this.todaysTodo.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedTodos = data;
      return;
    }

    this.sortedTodos = data.sort((a: Chore, b: Chore) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'time':
          return this.compare(a.time, b.time, isAsc);
        // case 'fat':
        //   return this.compare(a.fat, b.fat, isAsc);
        // case 'carbs':
        //   return this.compare(a.carbs, b.carbs, isAsc);
        // case 'protein':
        //   return this.compare(a.protein, b.protein, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
