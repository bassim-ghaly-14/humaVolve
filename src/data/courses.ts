export interface Course {
  id: string;
  name: string;
  level: string;
  lessons: number;
  status: 'Open' | 'In progress' | 'Completed';
}

/** Realistic sample dataset used only by the Assignment 02 Table demo. */
export const courses: Array<Course> = [
  {
    id: 'react-fundamentals',
    name: 'React Fundamentals',
    level: 'Beginner',
    lessons: 12,
    status: 'Open',
  },
  {
    id: 'reusable-components',
    name: 'Reusable Components',
    level: 'Beginner',
    lessons: 8,
    status: 'In progress',
  },
  {
    id: 'typescript-props',
    name: 'TypeScript Props & State',
    level: 'Intermediate',
    lessons: 10,
    status: 'Open',
  },
  {
    id: 'testing-accessibility',
    name: 'Testing & Accessibility',
    level: 'Intermediate',
    lessons: 6,
    status: 'Completed',
  },
];
