import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar'; // ツールバー用
import { MatTabsModule } from '@angular/material/tabs';     // タブバー用


@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    MatToolbarModule,
    MatTabsModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-app-angular'

  navLinks = [
    { path: 'task', label: 'タスク' },
    // { path: 'category', label: 'カテゴリ' },
  ];

  activeLink = this.navLinks[0].label
}
