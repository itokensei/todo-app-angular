import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'category-chip',
  imports: [CommonModule, MatChipsModule],
  template: `
    <mat-chip [ngStyle]="{ 'background-color': categoryColorHexCode }" [value]="categoryId">{{
      categoryName ?? nonCategoryName
    }}</mat-chip>
  `,
})
export class CategoryChipComponent implements OnInit {
  nonCategoryName: string = '未分類';

  @Input() categoryId: number | undefined;
  @Input() categoryName: string | undefined;
  @Input() categoryColorHexCode: string | undefined;

  constructor() {}

  ngOnInit(): void {}
}
