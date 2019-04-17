import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule, MatMenuModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PopupCourseComponent} from './components/poup-course/popup-course.component';
import {FormsModule} from '@angular/forms';
import { InfiniteScrollExampleComponent } from './components/infinite-scroll-example/infinite-scroll-example.component';
import { CoursesInfiniteScrollComponent } from './components/courses-infinite-scroll/courses-infinite-scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupCourseComponent,
    InfiniteScrollExampleComponent,
    CoursesInfiniteScrollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    InfiniteScrollModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PopupCourseComponent]
})
export class AppModule { }
