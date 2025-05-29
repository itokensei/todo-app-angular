import { Routes } from '@angular/router';
import { TaskComponent } from './features/task/task.component';

export const routes: Routes = [
  { path: '', redirectTo: '/api/tasks', pathMatch: 'full' },
  { path: 'api/tasks', component: TaskComponent },
  // { path: 'api/category', component: CategoryComponent },
];
