import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

import { Habit } from './habit';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  constructor(
    private db: AngularFirestore,
    private firebaseAuth: AngularFireAuth
  ) {
    this.firebaseAuth.auth.signInAnonymously();
  }

  HABITS: Observable<any[]>;
  private calcWeeks(habits: any): Habit[] {
    const habitsWithWeeks: Habit[] = [];
    for (const habit of habits) {
      const weeks: { [key: number]: boolean } = {};
      for (let d = 0; d < habit.activeDays.length; d++) {
        // based on: https://stackoverflow.com/questions/9045868/javascript-date-getweek
        const date: Date = new Date(habit.activeDays[d]);
        const newYear: Date = new Date(date.getFullYear(), 0, 1);
        let day = newYear.getDay();
        day = day >= 0 ? day : day + 7;
        const daynum: number =
          Math.floor(
            (date.getTime() -
              newYear.getTime() -
              (date.getTimezoneOffset() - newYear.getTimezoneOffset()) *
                60000) /
              86400000
          ) + 1;
        let week: number = Math.floor((daynum + day - 1) / 7) + 1;
        week = day < 4 ? week + 1 : week;
        weeks[week] = true;
      }
      const habitWithWeeks: Habit = habit;
      habitWithWeeks.activeWeeks = weeks;
      habitsWithWeeks.push(habitWithWeeks);
    }
    return habitsWithWeeks;
  }

  getHabits(): Observable<Habit[]> {
    return this.db
      .collection('habits')
      .valueChanges()
      .pipe(map(w => this.calcWeeks(w)));
  }
}
