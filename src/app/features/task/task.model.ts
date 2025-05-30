export interface ShowTaskResponse {
  allTasks: TaskListItem[];
  allStatus: Status[];
  allCategories: Category[];
}

export interface TaskListItem {
  id: number;
  title: string;
  body: string;
  state: Status;
  categoryId?: number;
  categoryName?: string;
  categoryColor?: Color;
}

export interface Status {
  code: number;
  name: string;
}

export interface Color {
  code: number;
  hexCode: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  color: Color;
}

export interface AddTaskRequest {
  title: string;
  body: string;
  categoryId?: number;
}

export interface UpdateTaskRequest {
  id: number;
  title: string;
  body: string;
  state: number;
  categoryId?: number;
}

export interface DeleteTaskRequest {
  id: number;
}
