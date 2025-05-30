import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { TaskEditDialogComponent } from '../task-edit-dialog/task-edit-dialog.component';
import { TaskListItem } from '../task.model';
import { TaskService } from '../task.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'task-delete-dialog',
  imports: [MatButtonModule],
  templateUrl: './task-delete-dialog.component.html',
  styleUrl: './task-delete-dialog.component.scss',
})
export class TaskDeleteDialogComponent implements OnInit {
  private notifier$ = new Subject<void>();
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  private taskService = inject(TaskService);

  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskItem: TaskListItem
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  onSubmit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
