import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoupCourseComponent } from './poup-course.component';

describe('PoupCourseComponent', () => {
  let component: PoupCourseComponent;
  let fixture: ComponentFixture<PoupCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoupCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoupCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
