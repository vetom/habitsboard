import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HabitData } from '../habit-data';

@Component({
  selector: 'app-add-habit-dialog',
  templateUrl: './add-habit-dialog.component.html',
  styleUrls: ['./add-habit-dialog.component.css']
})
export class AddHabitDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddHabitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HabitData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
