import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  templateUrl: './poup-course.component.html',
  styleUrls: ['./poup-course.component.css']
})
export class PoupCourseComponent {

  constructor(private dialogRef: MatDialogRef<PoupCourseComponent>) { }

  close() {
    console.log('Close');
  }

  save() {
    console.log('Save');
  }
}
