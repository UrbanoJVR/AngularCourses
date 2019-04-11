import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Teacher} from '../../domain/teacher';
import {ApiService} from '../../service/api.service';
import {Subscription} from 'rxjs';

@Component({
  templateUrl: './poup-course.component.html',
  styleUrls: ['./poup-course.component.css']
})
export class PoupCourseComponent implements OnInit {

  protected hoursArray: Array<number>;
  protected teachers: Teacher[];

  private sub: Subscription;

  constructor(private apiService: ApiService, private dialogRef: MatDialogRef<PoupCourseComponent>) {

  }

  ngOnInit(): void {
    this.initHoursArray();
    this.initTeachers();
  }

  initTeachers() {
    this.sub = this.apiService.getTeachers().subscribe(
      response => {
        this.teachers = response.content;
        console.log(response);
      }, error => console.log(error));
  }

  private initHoursArray() {
    this.hoursArray = new Array<number>();
    for (let i = 25; i < 151; i++) {
      this.hoursArray.push(i);
    }
  }

  close() {
    console.log('Close');
  }

  save() {
    console.log('Save');
  }
}
