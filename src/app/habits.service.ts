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

  private getDay(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const oneDay = 1000 * 60 * 60 * 24;
    const diff =
      date.getTime() -
      start.getTime() +
      (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
    return Math.floor(diff / oneDay);
  }

  private getWeek(date: Date): number {
    const start: Date = new Date(date.getFullYear(), 0, 1);
    let day = start.getDay();
    day = day >= 0 ? day : day + 7;
    const daynum: number =
      Math.floor(
        (date.getTime() -
          start.getTime() -
          (date.getTimezoneOffset() - start.getTimezoneOffset()) * 60000) /
          86400000
      ) + 1;
    let week: number = Math.floor((daynum + day - 1) / 7) + 1;
    week = day < 4 ? week + 1 : week;
    return week;
  }

  private getMonth(date: Date): number {
    return date.getMonth() + 1;
  }

  private parseHabits(data: any): Habit[] {
    return data.map((h: any) => h);
  }

  getHabits(): Observable<Habit[]> {
    return this.db
      .collection('habits')
      .valueChanges()
      .pipe(map(d => this.parseHabits(d)));
  }

  check(id: string): void {
    const now = new Date();
    const year = now.getFullYear();
    const day = this.getDay(now);
    const week = this.getWeek(now);
    const month = this.getMonth(now);
    this.db
      .collection('habits')
      .doc(`${id}`)
      .update({
        [`activeWeeks.${year}.${week}`]: true,
        [`activeDays.${year}.${day}`]: true,
        [`activeMonths.${year}.${month}`]: true
      });
  }

  add(title: string): void {
    const now = new Date();
    let id = '';
    const year = now.getFullYear();
    const habit = {
      title,
      activeDays: { [year]: {} },
      activeWeeks: { [year]: {} },
      activeMonths: { [year]: {} }
    };
    this.db
      .collection('habits')
      .add(habit)
      .then(habitRef => {
        id = habitRef.id;
      })
      .then(() =>
        this.db
          .collection('habits')
          .doc(id)
          .update({ id })
      );
  }
}
