import { Habit } from './habit';

export const HABITS: Habit[] = [
  {
    id: 1,
    title: 'Practice Soccer',
    activeDays: [new Date(2019, 0, 2), new Date(2019, 0, 19)],
    activeWeeks: {}
  },
  {
    id: 2,
    title: 'Reading',
    activeDays: [
      new Date(2019, 0, 2),
      new Date(2019, 0, 16),
      new Date(2019, 0, 22)
    ],
    activeWeeks: {}
  },
  {
    id: 2,
    title: 'Eat healthy',
    activeDays: [
      new Date(2019, 0, 13),
      new Date(2019, 0, 14),
      new Date(2019, 0, 15)
    ],
    activeWeeks: {}
  }
];
