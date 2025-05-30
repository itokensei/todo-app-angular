import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { TaskService } from '../task.service';
import { TaskListItem } from '../task.model';
import { CategoryChipComponent } from '../category-chip/category-chip.component';
import { Subject } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'task-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CategoryChipComponent,
    MatChipsModule,
  ],
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.scss'],
})
export class TaskEditDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private notifier$ = new Subject<void>();
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  private taskService = inject(TaskService);

  editForm!: FormGroup;
  categoryOptions = this.taskService.allCategories;
  stateOptions = this.taskService.allStatus;

  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskItem: TaskListItem
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [this.taskItem.id],
      title: [this.taskItem.title, [Validators.required]],
      body: [this.taskItem.body],
      state: [this.taskItem.state.code, [Validators.required]],
      categoryId: [this.taskItem.categoryId],
    });
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const request = this.editForm.value;
      console.log(request);
      this.dialogRef.close();
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
