import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Teacher} from '../domain/teacher';
import {Course} from '../domain/course';
import {Page} from '../domain/page';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTeachers() {
    return this.http.get<Page<Teacher>>('localhost:8080/teachers');
  }

  getCourses() {
    return this.http.get<Page<Course>>('http://localhost:8080/courses');
  }
}
