import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal } from '@angular/core';
import { taskListItem, showTaskResponse } from './task.model';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private url = 'http://localhost:9000/';
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);
  private initShowTaskResponse = {
    allTasks: [],
    allStatus: [],
    allCategories: [],
  } as showTaskResponse;
  private showTaskResponse: Signal<showTaskResponse>;
  allTasks: Signal<taskListItem[]>;

  constructor(private http: HttpClient) {
    this.showTaskResponse = toSignal(
      this.get().pipe(
        tap(() => {
          this.errorMessage.set(null);
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
    this.allTasks = computed(() => this.showTaskResponse().allTasks);
  }

  private get(): Observable<showTaskResponse> {
    return this.http.get<showTaskResponse>(this.url);
  }
}
