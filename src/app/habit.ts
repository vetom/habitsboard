export class Habit {
  id: number;
  title: string;
  activeDays: Date[];
  activeWeeks: { [key: number]: boolean };
}
