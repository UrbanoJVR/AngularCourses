import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {Course} from '../../domain/course';
import {Subscription} from 'rxjs';
import {Page} from '../../domain/pagedata/page';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {PopupCourseComponent} from '../poup-course/popup-course.component';
import {isUndefined} from 'util';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  private DEFAULT_PAGE_SIZE = 5;
  private DEFAULT_PAGE_NUMBER = 0;

  protected courses: Course[];
  private actualPageNumber: number;
  private totalPages: number;
  protected pages: Array<number>;
  private pageSize: number;
  private elementsInPage: number;

  sub: Subscription;

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  getCourses(pageSize: number, pageNumber: number) {
    this.sub = this.apiService.getCourses(pageSize, pageNumber).subscribe(
      response => {
        this.loadParams(response);
        console.log(response);
      }, error => console.log(error));
  }

  loadParams(resp: Page<Course>) {
    this.courses = resp.content;
    this.totalPages = resp.totalPages;
    this.setActualPageNumber(resp.pageable.pageNumber);
    this.pageSize = resp.pageable.pageSize;
    this.elementsInPage = resp.numberOfElements;
    this.pages = new Array(resp.totalPages);
  }

  initParams() {
    this.actualPageNumber = this.DEFAULT_PAGE_NUMBER;
    this.pageSize = this.DEFAULT_PAGE_SIZE;
  }

  goToPage(pageToGo: number) {
    this.setActualPageNumber(pageToGo);
    this.getCourses(this.pageSize, this.actualPageNumber);
  }

  changePageSize(newPageSize: number) {
    this.pageSize = newPageSize;
    this.getCourses(this.pageSize, this.DEFAULT_PAGE_NUMBER);
  }

  setActualPageNumber(newPageNumber: number) {
    if (newPageNumber > (this.totalPages - 1)) {
      this.actualPageNumber = this.totalPages - 1;
      return;
    }
    if (newPageNumber < 0) {
      this.actualPageNumber = 0;
      return;
    }
    this.actualPageNumber = newPageNumber;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(PopupCourseComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (!isUndefined(data)) {
          console.log('Data received in parent courses component:');
          if (this.verifyDataIntegrity(data)) {
            this.saveNewCourse(data);
          } else {
            console.log('Some data undefined. Cancel save');
          }
        } else {
          console.log('Undefined data. No will insert');
        }
      }, error => console.log(error));
  }

  private verifyDataIntegrity(course: Course) {
    if (isUndefined(course.title)) {
      console.log('course.title = undefined');
      return false;
    }
    if (isUndefined(course.teacher.id)) {
      console.log('teacher.id = undefined');
      return false;
    }
    if (isUndefined(course.level)) {
      console.log('course.level = undefined');
      return false;
    }
    if (isUndefined(course.hours)) {
      console.log('course.hours = undefined');
      return false;
    }
    if (isUndefined(course.active)) {
      console.log('course.active = undefined');
      return false;
    }
    return true;
  }

  private saveNewCourse(courseToInsert: Course) {
    console.log('Calling API service to insert ...');
    console.log(courseToInsert);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.initParams();
    this.getCourses(this.pageSize, this.actualPageNumber);
  }

}
