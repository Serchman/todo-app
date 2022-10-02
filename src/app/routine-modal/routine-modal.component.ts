import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-routine-modal',
  templateUrl: './routine-modal.component.html',
  styleUrls: ['./routine-modal.component.scss'],
})
export class RoutineModalComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    steps: new FormGroup({
      name: new FormControl(),
      product: new FormControl(),
      next: new FormControl(),
    }),
  });

  constructor(protected dialogRef: MatDialogRef<RoutineModalComponent>) {}

  ngOnInit(): void {}

  create() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup);
    }
  }
}
