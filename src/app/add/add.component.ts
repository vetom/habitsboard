import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { MatDialog } from '@angular/material';
import { AddHabitDialogComponent } from '../add-habit-dialog/add-habit-dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          backgroundColor: '#3f51b5'
        })
      ),
      state(
        'open',
        style({
          transform: `rotate(-45deg)`,
          backgroundColor: 'tomato'
        })
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')])
    ])
  ]
})
export class AddComponent {
  isOpen = false;
  newHabitTitle: string;

  constructor(public dialog: MatDialog) {}
  toggle() {
    this.isOpen = !this.isOpen;
    const dialogRef = this.dialog.open(AddHabitDialogComponent, {
      data: { title: this.newHabitTitle }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newHabitTitle = result;
      this.isOpen = !this.isOpen;
    });
  }
}
