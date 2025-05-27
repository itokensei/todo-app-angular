export interface taskListItem {
  id: number;
  title: string;
  body: string;
  state: status;
  categoryId?: number;
  categoryName?: string;
  categoryColor?: color;
}

export interface status {
  code: number;
  name: string;
}

export interface color {
  code: number;
  hexCode: string;
}

const url = 'http://localhost:9000'

export const DEMO_DATA: taskListItem[] = [
  {
    id: 1,
    title: 'title 1',
    body: 'body A',
    state: { code: 0, name: 'todo' },
    categoryId: 1,
    categoryName: 'frontend',
    categoryColor: { code: 1, hexCode: '#E67E22' },
  },
  {
    id: 2,
    title: 'title 2',
    body: 'body A',
    state: { code: 1, name: 'ongoing' },
    categoryId: 1,
    categoryName: 'frontend',
    categoryColor: { code: 1, hexCode: '#E67E22' },
  },
  {
    id: 3,
    title: 'title 3',
    body: 'body A',
    state: { code: 2, name: 'done' },
    categoryId: 1,
    categoryName: 'frontend',
    categoryColor: { code: 1, hexCode: '#E67E22' },
  },
  {
    id: 4,
    title: 'title 4',
    body: 'body A',
    state: { code: 0, name: 'todo' },
    categoryId: 1,
    categoryName: 'frontend',
    categoryColor: { code: 1, hexCode: '#E67E22' },
  },
  {
    id: 5,
    title: 'title 5',
    body: 'body A',
    state: { code: 1, name: 'ongoing' },
    categoryId: 1,
    categoryName: 'frontend',
    categoryColor: { code: 1, hexCode: '#E67E22' },
  },
  {
    id: 6,
    title: 'title 6',
    body: 'body A',
    state: { code: 2, name: 'done' },
    categoryId: 1,
    categoryName: 'frontend',
    categoryColor: { code: 1, hexCode: '#E67E22' },
  },
  {
    id: 7,
    title: 'title 7',
    body: 'body A',
    state: { code: 0, name: 'todo' },
    categoryId: 1,
    categoryName: 'frontend',
    categoryColor: { code: 1, hexCode: '#E67E22' },
  },
  {
    id: 8,
    title: 'title 8',
    body: 'body A',
    state: { code: 1, name: 'ongoing' },
    categoryId: 1,
    categoryName: 'frontend',
    categoryColor: { code: 1, hexCode: '#E67E22' },
  },
  {
    id: 9,
    title: 'title 9',
    body: 'body A',
    state: { code: 2, name: 'done' },
    categoryId: 1,
    categoryName: 'frontend',
    categoryColor: { code: 1, hexCode: '#E67E22' },
  },
  {
    id: 10,
    title: 'title 10',
    body: 'body A',
    state: { code: 0, name: 'todo' },
    categoryId: 1,
    categoryName: 'frontend',
    categoryColor: { code: 1, hexCode: '#E67E22' },
  },
  {
    id: 11,
    title: 'title 11',
    body: 'body A',
    state: { code: 1, name: 'ongoing' },
    categoryId: 1,
    categoryName: 'frontend',
    categoryColor: { code: 1, hexCode: '#E67E22' },
  },
  { id: 12, title: 'title 12', body: 'body B', state: { code: 2, name: 'done' } },
];
