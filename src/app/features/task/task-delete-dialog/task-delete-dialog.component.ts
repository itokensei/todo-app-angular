import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { TaskEditDialogComponent } from '../task-edit-dialog/task-edit-dialog.component';
import { DeleteTaskRequest, TaskListItem } from '../task.model';
import { TaskService } from '../task.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { CategoryChipComponent } from '../category-chip/category-chip.component';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'task-delete-dialog',
  imports: [
    MatButtonModule,
    MatProgressSpinner,
    CommonModule,
    CategoryChipComponent,
    MatChipsModule,
  ],
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

  onSubmit(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    const payload: DeleteTaskRequest = { id: this.taskItem.id };
    this.taskService
      .delete(payload)
      .pipe(takeUntil(this.notifier$))
      .subscribe({
        next: () => {
          console.log('next case');
          this.taskService.deleteFromAllTasksSignal(payload.id);
        },
        error: (error) => {
          this.errorMessage.set(error.message || 'An unxpected error has occured. ');
          alert(this.errorMessage());
          this.isLoading.set(false);
          this.dialogRef.close();
        },
        complete: () => {
          this.isLoading.set(false);
          this.dialogRef.close();
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
