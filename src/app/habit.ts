export class Habit {
  id: number;
  title: string;
  activeDays: string[];
  activeWeeks: { [key: number]: boolean };
}
