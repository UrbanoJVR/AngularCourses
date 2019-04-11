import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Teacher} from '../domain/teacher';
import {Course} from '../domain/course';
import {Page} from '../domain/pagedata/page';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URI = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getTeachers() {
    return this.http.get<Page<Teacher>>('localhost:8080/teachers');
  }

  getCourses(pageSize: number, pageNumber: number) {
    return this.http.get<Page<Course>>(this.BASE_URI + '/courses?size=' + pageSize + '&page=' + pageNumber);
  }
}
