import { Component, OnInit } from '@angular/core';
import { Habit } from '../habit';
import { HabitsService } from '../habits.service';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent implements OnInit {
  habits: Habit[];
  weeks: number[] = Array.from(Array(53).keys());

  constructor(private habitService: HabitsService) {}

  getHabits(): void {
    this.habitService.getHabits().subscribe(habits => (this.habits = habits));
  }
  ngOnInit() {
    this.getHabits();
  }
}
