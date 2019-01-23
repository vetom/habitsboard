import { Component, OnInit } from '@angular/core';
import { HABITS } from '../habits-sample';
import { Habit } from '../habit';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent implements OnInit {
  constructor() {}
  habits: Habit[] = HABITS;

  ngOnInit() {}
}
