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
  days: number[] = Array.from(Array(366).keys());
  weeks: number[] = Array.from(Array(52).keys());
  months: number[] = Array.from(Array(12).keys());
  year: number = new Date().getFullYear();

  constructor(private habitService: HabitsService) {}

  getHabits(): void {
    this.habitService.getHabits().subscribe(habits => (this.habits = habits));
  }

  check(id: number) {
    for (const habit of this.habits) {
      if (habit.id === id) {
        this.habitService.check(id);
        break;
      }
    }
  }

  ngOnInit() {
    this.getHabits();
  }
}
