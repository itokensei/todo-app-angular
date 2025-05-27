import { Routes } from '@angular/router';
import { TaskComponent } from './features/task/task.component';

export const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full' },
  { path: 'task', component: TaskComponent },
  // { path: 'category', component: CategoryComponent },
];