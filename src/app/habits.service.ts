import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';

import { Habit } from './habit';
import { HABITS } from './habits-sample';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  constructor() {}

  private calcWeeks(habit: Habit): Habit {
    const weeks: { [key: number]: boolean } = {};

    for (let d = 0; d < habit.activeDays.length; d++) {
      // based on: https://stackoverflow.com/questions/9045868/javascript-date-getweek
      const date: Date = habit.activeDays[d];
      const newYear: Date = new Date(date.getFullYear(), 0, 1);
      let day = newYear.getDay();
      day = day >= 0 ? day : day + 7;
      const daynum: number =
        Math.floor(
          (date.getTime() -
            newYear.getTime() -
            (date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
            86400000
        ) + 1;
      let week: number;
      if (day < 4) {
        week = Math.floor((daynum + day - 1) / 7) + 1;
        if (week > 52) {
          const nYear: Date = new Date(date.getFullYear() + 1, 0, 1);
          let nday: number = nYear.getDay();
          nday = nday >= 0 ? nday : nday + 7;
          week = nday < 4 ? 1 : 53;
        }
      } else {
        week = Math.floor((daynum + day - 1) / 7);
      }

      weeks[week] = true;
    }
    const habitWithWeeks: Habit = habit;
    habitWithWeeks.activeWeeks = weeks;
    return habitWithWeeks;
  }

  getHabits(): Observable<Habit[]> {
    return of(HABITS.map(this.calcWeeks));
  }
}
