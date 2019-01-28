export class Habit {
  id: number;
  title: string;
  activeWeeks: { [year: number]: { [week: number]: boolean } };
  activeDays: { [year: number]: { [day: number]: boolean } };
}
