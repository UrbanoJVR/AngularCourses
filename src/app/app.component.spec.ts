import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {CoursesInfiniteScrollComponent} from './components/courses-infinite-scroll/courses-infinite-scroll.component';
import {MatMenuModule} from '@angular/material';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatMenuModule,
        InfiniteScrollModule,
        HttpClientModule,
        HttpClientTestingModule // This is if you want to mock request (we will do it...)
      ],
      declarations: [
        AppComponent,
        CoursesInfiniteScrollComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'AngularCourses'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('AngularCourses');
  });

  it('should render title in a h1 tag', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // fixture.detectChanges();
    // const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('h1').textContent).toContain('Welcome to AngularCourses!');
    // COMENTED BECAUSE OUR APP ROOT COMPONENT NOT CONTAINS H1 WITH TITLE
  });
});
