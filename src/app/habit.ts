export class Habit {
  id: string;
  title: string;
  activeWeeks: { [year: number]: { [week: number]: boolean } };
  activeDays: { [year: number]: { [day: number]: boolean } };
  activeMonths: { [year: number]: { [day: number]: boolean } };
}
