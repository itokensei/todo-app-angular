import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Signal, signal } from '@angular/core';
import {
  TaskListItem,
  ShowTaskResponse,
  Category,
  AddTaskRequest,
  Status,
  UpdateTaskRequest,
} from './task.model';
import { catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { API_CONFIG } from '../../configs/api-config.token';
import { ApiConfig } from '../../configs/api-config.interface';

@Injectable({ providedIn: 'root' })
export class TaskService {
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);
  private initShowTaskResponse = {
    allTasks: [],
    allStatus: [],
    allCategories: [],
  } as ShowTaskResponse;
  private showTaskResponse: Signal<ShowTaskResponse>;
  private url;
  private _allTasks = signal<TaskListItem[]>([]);
  allTasks = this._allTasks.asReadonly();
  private _allCategories = signal<Category[]>([]);
  allCategories = this._allCategories.asReadonly();
  private _allStatus = signal<Status[]>([]);
  allStatus = this._allStatus.asReadonly();

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private config: ApiConfig
  ) {
    this.url = `${this.config.baseUrl}/${this.config.endpoints.tasks}`;
    this.showTaskResponse = toSignal(
      this.get().pipe(
        tap((response) => {
          this.errorMessage.set(null);
          this._allTasks.set(response.allTasks || []);
          this._allCategories.set(response.allCategories || []);
          this._allStatus.set(response.allStatus || []);
        }),
        catchError((error) => {
          console.error('APIからのTaskデータ取得に失敗しました:', error);
          this.errorMessage.set('Taskデータ取得に失敗しました。');
          return of(this.initShowTaskResponse);
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      ),
      { initialValue: this.initShowTaskResponse }
    );
  }

  private get(): Observable<ShowTaskResponse> {
    return this.http.get<ShowTaskResponse>(this.url);
  }

  add(task: AddTaskRequest): Observable<TaskListItem> {
    return this.http.post<TaskListItem>(this.url, task).pipe(
      tap((taskItem: TaskListItem) => {
        this._allTasks.update((tasks) => [...tasks, taskItem]);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('TaskAddApiError: ', error);
        let message = '';
        if (error.error['obj.title']) {
          message += error.error['obj.title'][0].msg[0];
        }
        if (error.error['obj.body']) {
          message += error.error['obj.body'][0].msg[0];
        }
        if (!message) {
          message = error.message;
        }
        return throwError(() => new Error('Failed to add Task: ' + message));
      })
    );
  }

  update(task: UpdateTaskRequest): Observable<TaskListItem> {
    return this.http.put<TaskListItem>(this.url, task).pipe(
      tap((updatedTask: TaskListItem) => {
        this._allTasks.update((tasks) => {
          const index = tasks.findIndex((task) => task.id === updatedTask.id);
          if (index > -1) {
            tasks[index] = updatedTask;
          }
          return [...tasks]; // signalの変更をAngularに検知させるために、参照を変える。
        });
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('TaskUpdateApiError: ', error);
        let message = '';
        if (error.error['obj.title']) {
          message += error.error['obj.title'][0].msg[0];
        }
        if (error.error['obj.body']) {
          message += error.error['obj.body'][0].msg[0];
        }
        if (!message) {
          message = error.message;
        }
        return throwError(() => new Error('Failed to update Task: ' + message));
      })
    );
  }
}
