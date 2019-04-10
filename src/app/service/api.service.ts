import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Teacher} from '../domain/teacher';
import {Course} from '../domain/course';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTeachers() {
    return this.http.get<Teacher[]>('localhost:8080/teachers');
  }

  getCourses() {
    return this.http.get<Course[]>('localhost:8080/courses');
  }
}
