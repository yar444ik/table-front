import { Student } from 'src/app/models/students';
import { DialogPutWrapperComponent } from './../student-editor/dialog-put-wrapper/dialog-put-wrapper.component';
import { BaseServiceService } from './../../service/base-service.service';

import { Component, OnInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditWrapperComponent } from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { DialogDeleteWrapperComponent } from '../student-editor/dialog-delete-wrapper/dialog-delete-wrapper.component';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.scss']
})
export class TableStudentsComponent implements OnInit {
  students: Student[];
  student: Student;

  constructor(private baseService: BaseServiceService,
    public dialog: MatDialog,) {
    this.students = [];
    this.student = new Student;
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    console.log("TableStudentComponent");
    this.baseService.getAllStudents().subscribe(data => this.students = data);

  }

  addNewStudent(): void {
    const dialogAddingNewStudent =
    this.dialog.open(DialogEditWrapperComponent,
      {
        width: '400px',
        data: null,
      });
    dialogAddingNewStudent.afterClosed().subscribe((result: Student) => {
      if (result != null) {
        console.log("adding new student: " + result.name);
        this.baseService.addNewStudent(result).subscribe(k=>
          // this.baseService.getAllStudents().subscribe(data => {
          //   this.students = data;
            this.getStudents());
            // this.updateStudentIds();
      }
    });
  }

  putStudent(student: Student): void {
    const dialogPutStudent =
    this.dialog.open(DialogPutWrapperComponent, {
      width: '400px',
      data: student,
    });
    dialogPutStudent.afterClosed().subscribe((result: Student) => {
      if (result != null) {
        console.log("edit student on: " + student.id);
        result.id = student.id;
        this.baseService.putStudent(result).subscribe(k=>
          // this.baseService.getAllStudents().subscribe(data =>
          //   this.students = data));
            this.getStudents());
      }
    });
  }

  deleteStudent(student: Student): void {
    const dialogDeletingStudent =
    this.dialog.open(DialogDeleteWrapperComponent, {
      width: '400px',
      data: null,
    });
    dialogDeletingStudent.afterClosed().subscribe((result: Student)=> {
      if (result != null) {
        console.log("delete student: " + student.name);
        result.id = student.id;
        this.baseService.delStudent(result).subscribe(k=>
          // this.baseService.getAllStudents().subscribe(data => {
          //   this.students = data;
          //   // this.updateStudentIds();
          // }));
          this.getStudents());
      }
    });
  }

  // updateStudentsIds() {
  //   this.dataSource.data.forEach((student, index) => {
  //     student.id = index + 1;
  //   });

  //   this.dataSource.data.forEach(student => {
  //     this.baseService.updateStudent(student).subscribe();
  //   });
  // }

}
