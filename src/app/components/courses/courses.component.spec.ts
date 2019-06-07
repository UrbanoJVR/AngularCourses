import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import {ApiService} from '../../service/api/api.service';
import {instance, mock} from 'ts-mockito';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CoursesComponent', () => {

  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  const mockApiService = mock(ApiService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent ],
      providers: [
        {
          provide: ApiService, useValue: instance(mockApiService)
        }
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
