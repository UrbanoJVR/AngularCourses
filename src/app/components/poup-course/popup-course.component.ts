import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Teacher} from '../../domain/teacher';
import {ApiService} from '../../service/api.service';
import {Subscription} from 'rxjs';
import {Course} from '../../domain/course';

@Component({
  templateUrl: './popup-course.component.html',
  styleUrls: ['./popup-course.component.css']
})
export class PopupCourseComponent implements OnInit {

  protected hoursArray: Array<number>;
  protected teachers: Teacher[];

  private sub: Subscription;

  private courseToInsert: Course;

  constructor(private apiService: ApiService, private dialogRef: MatDialogRef<PopupCourseComponent>) {

  }

  ngOnInit(): void {
    this.initDefaultCourse();
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

  closeWithoutSave() {
    console.log('Closed without save');
    this.dialogRef.close();
  }

  private initDefaultCourse() {
    this.courseToInsert = new Course();
    this.courseToInsert.teacher = new Teacher();
    this.courseToInsert.hours = 25;
    this.courseToInsert.level = 'Intermedio';
    this.courseToInsert.active = true;
  }
}
