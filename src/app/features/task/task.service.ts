import { HttpClient } from '@angular/common/http';
import { computed, Inject, Injectable, Signal, signal } from '@angular/core';
import { taskListItem, showTaskResponse } from './task.model';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
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
  allTasks: Signal<taskListItem[]>;
  private url;

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private config: ApiConfig
  ) {
    this.url = `${this.config.baseUrl}/${this.config.endpoints.tasks}`;
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
