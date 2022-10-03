import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-routine-modal',
  templateUrl: './routine-modal.component.html',
  styleUrls: ['./routine-modal.component.scss'],
})
export class RoutineModalComponent implements OnInit {
  formGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    time: new UntypedFormControl('', [Validators.required]),
    steps: new UntypedFormGroup({
      name: new UntypedFormControl(),
      product: new UntypedFormControl(),
      next: new UntypedFormControl(),
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
