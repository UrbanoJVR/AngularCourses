import {Teacher} from './teacher';

export class Course {
  id: number;
  title: string;
  teacher: Teacher;
  level: string;
  hours: number;
  active: boolean;
}
