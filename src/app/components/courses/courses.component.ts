import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {Course} from '../../domain/course';
import {Subscription} from 'rxjs';
import {Page} from '../../domain/pagedata/page';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {PoupCourseComponent} from '../poup-course/poup-course.component';

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

    this.dialog.open(PoupCourseComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.initParams();
    this.getCourses(this.pageSize, this.actualPageNumber);
  }
}
