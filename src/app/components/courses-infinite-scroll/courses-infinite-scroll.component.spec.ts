import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesInfiniteScrollComponent } from './courses-infinite-scroll.component';
import {anything, instance, mock, when} from 'ts-mockito';
import {ApiService} from '../../service/api/api.service';

describe('CoursesInfiniteScrollComponent', () => {
  let component: CoursesInfiniteScrollComponent;
  let fixture: ComponentFixture<CoursesInfiniteScrollComponent>;
  const mockApiService = mock(ApiService);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesInfiniteScrollComponent ],
      providers: [
        {
          provide: ApiService, useValue: instance(mockApiService)
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    when(mockApiService.getCourses(anything(), anything())).thenReturn({[{id:1, name:"pepe"}]});

    fixture = TestBed.createComponent(CoursesInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses on init', () => {
    component.courses = [];

    component.ngOnInit();

    expect(component.courses).toEqual([{id:1, name:"pepe"}]);
  });
});
