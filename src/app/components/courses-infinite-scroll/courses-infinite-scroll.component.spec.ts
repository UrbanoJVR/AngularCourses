import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesInfiniteScrollComponent } from './courses-infinite-scroll.component';

describe('CoursesInfiniteScrollComponent', () => {
  let component: CoursesInfiniteScrollComponent;
  let fixture: ComponentFixture<CoursesInfiniteScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesInfiniteScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
