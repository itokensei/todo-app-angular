import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../task.service';
import { CategoryChipComponent } from '../category-chip/category-chip.component';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AddTaskRequest, Category } from '../task.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'task-add-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    CategoryChipComponent,
    CommonModule,
  ],
  templateUrl: './task-add-form.component.html',
  styleUrl: './task-add-form.component.scss',
})
export class TaskAddFormComponent implements OnInit {
  private notifier$ = new Subject<void>();
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  private taskService = inject(TaskService);
  categoryOptions = this.taskService.allCategories;
  form = new FormGroup({
    categoryId: new FormControl<number | null>(null),
    title: new FormControl<string>('', Validators.required),
    body: new FormControl<string>(''),
  });

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  onSubmit() {
    if (this.form.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      const payload: AddTaskRequest = {
        title: this.form.value.title!,
        body: this.form.value.body!,
        categoryId: Number(this.form.value.categoryId!),
      };
      this.taskService
        .add(payload)
        .pipe(takeUntil(this.notifier$)) // http clientは自動的に完了するが、本コンポーネント破棄時の解除処理を入れる。
        .subscribe({
          next: () => {
            if (this.formDirective) {
              this.formDirective.resetForm();
            }
            this.form.reset();
          },
          error: (error) => {
            this.errorMessage.set(error.message || 'An unxpected error has occured. ');
            alert(this.errorMessage());
          },
          complete: () => {
            this.isLoading.set(false);
            console.log(this.isLoading());
          },
        });
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }
}
