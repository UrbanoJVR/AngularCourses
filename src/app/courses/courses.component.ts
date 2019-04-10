import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../service/api.service';
import {Course} from '../domain/course';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[];
  sub: Subscription;

  constructor(private apiService: ApiService) { }

  searchCourses() {
    this.sub = this.apiService.getCourses().subscribe(response => this.courses = response.content, error => console.log(error));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.searchCourses();
  }

}
