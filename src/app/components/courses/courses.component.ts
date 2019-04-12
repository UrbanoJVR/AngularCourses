import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../service/api/api.service';
import {Course} from '../../domain/course';
import {Subscription} from 'rxjs';
import {Page} from '../../domain/pagedata/page';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {PopupCourseComponent} from '../poup-course/popup-course.component';
import {isUndefined} from 'util';
import {LogService} from '../../service/log/log.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  private DEFAULT_PAGE_SIZE = 5;
  private DEFAULT_PAGE_NUMBER = 0;
  private LOG_TAG = 'COURSES_COMPONENT: ';

  protected courses: Course[];
  private actualPageNumber: number;
  private totalPages: number;
  protected pages: Array<number>;
  private pageSize: number;
  private elementsInPage: number;

  sub: Subscription;
  private logService: LogService;

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.logService = new LogService(this.LOG_TAG);
  }

  getCourses(pageSize: number, pageNumber: number) {
    this.sub = this.apiService.getCourses(pageSize, pageNumber).subscribe(
      response => {
        this.loadParams(response);
        this.logService.printLogWithObject('Response from apiService:', response);
      }, error => this.logService.print(error, LogService.ERROR_MSG));
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
          this.logService.print('CoursesComponent: data received from dialog', LogService.DEFAULT_MSG);
          if (this.verifyDataIntegrity(data)) {
            this.logService.printLogWithObject('Data integrity verification success. Course to insert:', data);
            this.saveNewCourse(data);
          } else {
            this.logService.print('Some data undefined. Cancel save', LogService.WARN_MSG);
          }
        } else {
          this.logService.print('Undefined data. No will insert', LogService.DEFAULT_MSG);
        }
      }, error => this.logService.print(error, LogService.ERROR_MSG));
  }

  private verifyDataIntegrity(course: Course) {
    this.logService.print('Verifying data integrity...', LogService.DEFAULT_MSG);
    if (isUndefined(course.title)) {
      this.logService.print('course.title = undefined', LogService.WARN_MSG);
      return false;
    }
    if (isUndefined(course.teacher.id)) {
      this.logService.print('teacher.id = undefined', LogService.WARN_MSG);
      return false;
    }
    if (isUndefined(course.level)) {
      this.logService.print('course.level = undefined', LogService.WARN_MSG);
      return false;
    }
    if (isUndefined(course.hours)) {
      this.logService.print('course.hours = undefined', LogService.WARN_MSG);
      return false;
    }
    if (isUndefined(course.active)) {
      this.logService.print('course.active = undefined', LogService.WARN_MSG);
      return false;
    }
    return true;
  }

  private saveNewCourse(courseToInsert: Course) {
    this.logService.print('Calling API service to insert ...', LogService.DEFAULT_MSG);
    this.apiService.addCourse(courseToInsert).subscribe();
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.initParams();
    this.getCourses(this.pageSize, this.actualPageNumber);
  }
}
