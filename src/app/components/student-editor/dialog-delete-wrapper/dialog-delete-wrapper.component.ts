import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/models/students';

@Component({
  selector: 'app-dialog-delete-wrapper',
  templateUrl: './dialog-delete-wrapper.component.html',
  styleUrls: ['./dialog-delete-wrapper.component.scss']
})
export class DialogDeleteWrapperComponent implements OnInit {
  editingStudent: Student;

  constructor(public dialogRef: MatDialogRef<DialogDeleteWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student) {
      this.editingStudent = new Student();
    }

  ngOnInit(): void {
  }
}
