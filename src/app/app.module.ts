import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import {PopupCourseComponent} from './components/poup-course/popup-course.component';
import {FormsModule} from '@angular/forms';
import { InfiniteScrollExampleComponent } from './components/infinite-scroll-example/infinite-scroll-example.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    PopupCourseComponent,
    InfiniteScrollExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PopupCourseComponent]
})
export class AppModule { }
