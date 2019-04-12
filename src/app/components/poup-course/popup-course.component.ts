import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Teacher} from '../../domain/teacher';
import {ApiService} from '../../service/api/api.service';
import {Subscription} from 'rxjs';
import {Course} from '../../domain/course';
import {LogService} from '../../service/log/log.service';

@Component({
  templateUrl: './popup-course.component.html',
  styleUrls: ['./popup-course.component.css']
})
export class PopupCourseComponent implements OnInit {

  protected hoursArray: Array<number>;
  protected teachers: Teacher[];
  private LOG_TAG: 'POPUP_COURSE_COMPONENT: ';

  private sub: Subscription;
  private logService: LogService;

  private courseToInsert: Course;

  constructor(private apiService: ApiService, private dialogRef: MatDialogRef<PopupCourseComponent>) {
    this.logService = new LogService(this.LOG_TAG);
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
        this.logService.printLogWithObject('Teachers list', response);
      }, error => this.logService.print(error, LogService.ERROR_MSG));
  }

  private initHoursArray() {
    this.hoursArray = new Array<number>();
    for (let i = 25; i < 151; i++) {
      this.hoursArray.push(i);
    }
  }

  closeWithoutSave() {
    this.logService.print('Closed without save', LogService.DEFAULT_MSG);
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
