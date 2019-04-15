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

  private courses: Array<Course>;
  private pageToGet: number;
  private totalPages: number;

  private sub: Subscription;
  private logService: LogService;

  constructor(private apiService: ApiService) {
    this.logService = new LogService(this.LOG_TAG);
    this.pageToGet = 0;
    this.courses = new Array<Course>();
  }

  getPageOfCourses() {
    this.sub = this.apiService.getCourses(this.PAGE_SIZE, this.pageToGet).subscribe(
      response => {
        this.logService.print('Getting page ' + this.pageToGet + ' ...', LogService.DEFAULT_MSG);
        this.addCoursesToArray(response);
        this.logService.printLogWithObject('Response from apiService:', response);
        this.pageToGet ++;
      }, error => this.logService.print(error, LogService.ERROR_MSG));
  }

  addCoursesToArray(resp: Page<Course>) {
      const coursesToAppend: Course[] = resp.content;
      this.appendCourses(coursesToAppend);
      this.logService.print('Courses appended = ' + coursesToAppend.length, LogService.DEFAULT_MSG);
      this.logService.printLogWithObject('Courses content => ', this.courses);
  }

  appendCourses(coursesToAppend: Course[]) {
    for (const course of coursesToAppend) {
      this.courses.push(course);
      this.logService.print('Added course => ' + course.title, LogService.DEFAULT_MSG);
    }
  }

  ngOnInit() {
    this.getPageOfCourses();
  }

  editCourse(course: Course) {
    this.logService.printLogWithObject('Edit course => ', course);
  }

  deleteCourse(course: Course) {
    this.logService.printLogWithObject('Delete course => ', course);
  }

  onScroll() {
    this.logService.print('Scroll DOWN!!', LogService.DEFAULT_MSG);
    this.getPageOfCourses();
  }
}
