export interface showTaskResponse {
  allTasks: taskListItem[];
  allStatus: status[];
  allCategories: category[];
}

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

export interface category {
  id: number;
  name: string;
  slug: string;
  color: color;
}
