import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    interval: new FormControl('', [Validators.required]),
  });

  constructor(protected dialogRef: MatDialogRef<AddTaskComponent>) {}

  ngOnInit(): void {}
  create() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup);
    }
  }
}
