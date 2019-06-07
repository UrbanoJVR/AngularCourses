import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesInfiniteScrollComponent } from './courses-infinite-scroll.component';
import {anything, instance, mock, verify, when} from 'ts-mockito';
import {ApiService} from '../../service/api/api.service';
import {Observable} from 'rxjs';
import {MatMenuModule} from '@angular/material';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AppComponent} from '../../app.component';
import {Course} from '../../domain/course';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CoursesInfiniteScrollComponent', () => {

  let component: CoursesInfiniteScrollComponent;
  let fixture: ComponentFixture<CoursesInfiniteScrollComponent>;
  const mockApiService = mock(ApiService);
  const mockObservable = mock(Observable);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesInfiniteScrollComponent ],
      providers: [
        {
          provide: ApiService, useValue: instance(mockApiService)
          // provide: ApiService, useValue: instance(mockApiService)
        }
      ],
      imports: [
        MatMenuModule,
        InfiniteScrollModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
    when(mockApiService.getCourses(anything(), anything())).thenReturn(mockObservable);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in div h1', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('CURSOS AUTENTIA');
  });

  it('should call service on init', () => {

    component.ngOnInit();

    verify(mockApiService.getCourses(anything(), anything())).called();
  });

  it('should load courses on init', () => {
    const observable = mock(Observable);
    const mockArrayCourses = mock(Array);

    component.ngOnInit();

    verify((anything(), anything())).called();
  });
});
