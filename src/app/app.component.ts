import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Chore } from 'app/models/chore';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

export enum weekDays {
  sunday = 0,
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
  saturday = 6,
}
export type NameValueInterface = {
  name: string;
  value: 'name' | 'often' | 'next' | 'time' | 'lastDone' | 'select';
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent implements OnInit {
  title!: string;
  tasks$!: Observable<any>;

  app: FirebaseApp | undefined;
  tasksDB;
  expandedElement: any;

  apps = [
    {
      name: 'Tasks',
      route: '/tasks',
    },
    {
      name: 'Skincare',
      route: '/skincare',
    },
  ];

  constructor(db: AngularFireDatabase, protected route: Router) {
    this.tasksDB = db.list<Chore>('/Tasks');
    this.tasks$ = this.tasksDB.valueChanges().pipe(
      map((tasks: any) => {
        return tasks.map((task: any) => new Chore(task));
      }),
      map((tasks: Chore[]) => {
        const todaysTasks = tasks.filter((task: Chore) => {
          return !task.next || task.next.getTime() <= new Date().getTime();
        });
        return todaysTasks;
      })
    );
  }

  ngOnInit() {
    this.route.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const appType = this.apps.find(
          (appRoute) => appRoute.route === event.url
        );

        this.title = appType?.name || '';
      });
  }
}
