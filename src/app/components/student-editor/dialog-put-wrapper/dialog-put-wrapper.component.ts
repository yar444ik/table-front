import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

import { Student } from 'src/app/models/students';

@Component({
  selector: 'app-dialog-put-wrapper',
  templateUrl: './dialog-put-wrapper.component.html',
  styleUrls: ['./dialog-put-wrapper.component.scss']
})
export class DialogPutWrapperComponent implements OnInit {
  putStudent: Student;

  constructor(public dialogRef: MatDialogRef<DialogPutWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student) {
      this.putStudent = new Student;
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
