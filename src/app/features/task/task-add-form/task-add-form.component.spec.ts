import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddFormComponent } from './task-add-form.component';

describe('TaskAddFormComponent', () => {
  let component: TaskAddFormComponent;
  let fixture: ComponentFixture<TaskAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAddFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
