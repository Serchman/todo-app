import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { Routine } from 'app/models/routine';
import { RoutineModalComponent } from 'app/routine-modal/routine-modal.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-skincare',
  templateUrl: './skincare.component.html',
  styleUrls: ['./skincare.component.scss'],
})
export class SkincareComponent implements OnInit {
  skinCareDB;

  skinCareRoutines$: Observable<Routine[]>;
  constructor(db: AngularFireDatabase, public dialog: MatDialog) {
    this.skinCareDB = db.list<any>('/Skincare');
    this.skinCareRoutines$ = this.skinCareDB.valueChanges().pipe(
      map((routines: Routine[]) => {
        return routines.map((routine) => new Routine(routine));
      })
    );
  }

  ngOnInit(): void {
    this.skinCareRoutines$.subscribe((data) => console.log(data));
  }

  addNewRoutine() {
    const dialogRef = this.dialog.open(RoutineModalComponent);
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
      this.skinCareDB.push(chore);
    });
  }
}
