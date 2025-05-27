import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { DEMO_DATA, taskListItem } from '../task-model';
import { CommonModule } from '@angular/common';
import { CategoryChipComponent } from '../category-chip/category-chip.component';

@Component({
  selector: 'task-table',
  styleUrl: 'task-table.component.scss',
  templateUrl: 'task-table.component.html',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule, MatChipsModule, CategoryChipComponent],
})
export class TaskTable implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['stateName', 'categoryName', 'title', 'body'];
  dataSource = new MatTableDataSource(DEMO_DATA);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: taskListItem, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'stateName':
          console.log('switch success')
          return item.state.name;
        default:
          return (item as any)[sortHeaderId];
      }
    }
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
