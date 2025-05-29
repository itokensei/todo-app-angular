import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Signal, signal } from '@angular/core';
import { taskListItem, showTaskResponse, category, addTaskRequest } from './task.model';
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
  } as showTaskResponse;
  private showTaskResponse: Signal<showTaskResponse>;
  private url;
  private _allTasks = signal<taskListItem[]>([]);
  allTasks = this._allTasks.asReadonly();
  private _allCategories = signal<category[]>([]);
  allCategories = this._allCategories.asReadonly();

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

  private get(): Observable<showTaskResponse> {
    return this.http.get<showTaskResponse>(this.url);
  }

  add(task: addTaskRequest): Observable<taskListItem> {
    return this.http.post<taskListItem>(this.url + 'task', task).pipe(
      tap((taskItem: taskListItem) => {
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
}
