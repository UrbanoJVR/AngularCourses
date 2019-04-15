import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api/api.service';
import {LogService} from '../../service/log/log.service';
import {Subscription} from 'rxjs';
import {Course} from '../../domain/course';
import {Page} from '../../domain/pagedata/page';
import {isEmpty} from 'rxjs/operators';

@Component({
  selector: 'app-courses-infinite-scroll',
  templateUrl: './courses-infinite-scroll.component.html',
  styleUrls: ['./courses-infinite-scroll.component.css']
})
export class CoursesInfiniteScrollComponent implements OnInit {

  private LOG_TAG = 'COURSES_INFINITE_SCROLL: ';
  private PAGE_SIZE = 15;

  private courses: Course[];
  private actualPage: number;
  private totalPages: number;

  private sub: Subscription;
  private logService: LogService;

  constructor(private apiService: ApiService) {
    this.logService = new LogService(this.LOG_TAG);
    this.actualPage = 0;
    this.courses = new Array<Course>();
  }

  getPageOfCourses(pageToGet: number) {
    this.sub = this.apiService.getCourses(this.PAGE_SIZE, pageToGet).subscribe(
      response => {
        this.addCoursesToArray(response);
        this.logService.printLogWithObject('Response from apiService:', response);
      }, error => this.logService.print(error, LogService.ERROR_MSG));
  }

  addCoursesToArray(resp: Page<Course>) {
    if (this.courses.length > 0) {
      const coursesToAppend: Course[] = resp.content;
      this.courses.concat(coursesToAppend);
      this.logService.print('Courses appended = ' + coursesToAppend.length, LogService.DEFAULT_MSG);
    } else {
      this.courses = resp.content;
      this.logService.print('Courses array initialized', LogService.DEFAULT_MSG);
    }
  }

  ngOnInit() {
    this.getPageOfCourses(this.actualPage);
  }

  editCourse(course: Course) {
    this.logService.printLogWithObject('Edit course => ', course);
  }

  deleteCourse(course: Course) {
    this.logService.printLogWithObject('Delete course => ', course);
  }
}
