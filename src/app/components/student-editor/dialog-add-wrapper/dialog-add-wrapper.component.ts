import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-dialog-add-wrapper',
  templateUrl: './dialog-add-wrapper.component.html',
  styleUrls: ['./dialog-add-wrapper.component.scss']
})
export class DialogAddWrapperComponent implements OnInit {
  addStudent: Student;

  constructor(public dialogRef: MatDialogRef<DialogAddWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,) {
      this.addStudent = new Student();}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
