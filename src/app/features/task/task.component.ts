import { Component, OnInit } from '@angular/core';
import { TaskTable } from './task-table/task-table.component';

@Component({
  selector: 'task',
  standalone: true,
  imports: [TaskTable],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  ngOnInit(): void {}
}
