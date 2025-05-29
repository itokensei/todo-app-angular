import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, effect, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { TaskListItem } from '../task.model';
import { CommonModule } from '@angular/common';
import { CategoryChipComponent } from '../category-chip/category-chip.component';
import { TaskService } from '../task.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'task-table',
  styleUrl: 'task-table.component.scss',
  templateUrl: 'task-table.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    CommonModule,
    MatChipsModule,
    CategoryChipComponent,
    MatProgressSpinnerModule,
  ],
})
export class TaskTable implements AfterViewInit {
  readonly isLoading = inject(TaskService).isLoading;
  readonly errorMessage = inject(TaskService).errorMessage;
  readonly taskList = inject(TaskService).allTasks;
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['stateName', 'categoryName', 'title', 'body'];
  dataSource = new MatTableDataSource(this.taskList());
  readonly originalAccessor = this.dataSource.sortingDataAccessor;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this.taskList();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // MatTableDataSourceはデフォルトで、item内でmatColumnDefと同じkeyを探し、その値でsortする。
    // item.state.codeでsortするための変更
    this.dataSource.sortingDataAccessor = (item: TaskListItem, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'stateName':
          return item.state.code;
        default:
          return this.originalAccessor(item, sortHeaderId)
      }
    };
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
