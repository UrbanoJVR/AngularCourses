import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCourseComponent } from './popup-course.component';

describe('PopupCourseComponent', () => {
  let component: PopupCourseComponent;
  let fixture: ComponentFixture<PopupCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
