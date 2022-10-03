import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  formGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    time: new UntypedFormControl('', [Validators.required]),
    interval: new UntypedFormControl('', [Validators.required]),
  });

  constructor(protected dialogRef: MatDialogRef<AddTaskComponent>) {}

  ngOnInit(): void {}
  create() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup);
    }
  }
}
