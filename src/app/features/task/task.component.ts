import { Component, OnInit } from '@angular/core';
import { TaskTable } from './task-table/task-table.component';
import { TaskAddFormComponent } from './task-add-form/task-add-form.component';

@Component({
  selector: 'task',
  standalone: true,
  imports: [TaskTable, TaskAddFormComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  ngOnInit(): void {}
}
