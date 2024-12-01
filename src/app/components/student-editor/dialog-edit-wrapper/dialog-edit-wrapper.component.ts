import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

import { Student } from 'src/app/models/students';

@Component({
  selector: 'app-dialog-edit-wrapper',
  templateUrl: './dialog-edit-wrapper.component.html',
  styleUrls: ['./dialog-edit-wrapper.component.scss']
})
export class DialogEditWrapperComponent implements OnInit {
  editingStudent : Student;
  constructor(public dialogRef: MatDialogRef<DialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student) {
      this.editingStudent = data ? {...data} : new Student();
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmEdit(): void {
    this.dialogRef.close(this.editingStudent);
  }

}
