import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Teacher} from '../../domain/teacher';
import {Course} from '../../domain/course';
import {Page} from '../../domain/pagedata/page';
import {catchError} from 'rxjs/operators';
import {LogService} from '../log/log.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URI = 'http://localhost:8080';
  private LOG_TAG = 'API_SERVICE: ';
  private logService: LogService;

  constructor(private http: HttpClient) {
    this.logService = new LogService(this.LOG_TAG);
  }

  getTeachers() {
    try {
      return this.http.get<Page<Teacher>>(this.BASE_URI + '/teachers?size=' + Number.MAX_SAFE_INTEGER + '&page=' + 0);
    } catch (error) {
      this.logService.print(error, LogService.ERROR_MSG);
    }
  }

  getCourses(pageSize: number, pageNumber: number) {
    try {
      return this.http.get<Page<Course>>(this.BASE_URI + '/courses?size=' + pageSize + '&page=' + pageNumber);
    } catch (error) {
      this.logService.print(error, LogService.ERROR_MSG);
    }
  }

  addCourse(course: Course) {
    try {
      return this.http.post<Course>(this.BASE_URI + '/courses', course);
    } catch (error) {
      this.logService.print(error, LogService.ERROR_MSG);
    }
  }
}
