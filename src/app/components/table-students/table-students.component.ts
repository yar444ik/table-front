import { BaseServiceService } from './../../service/base-service.service';
import { Student } from 'src/app/models/students';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditWrapperComponent } from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.scss']
})
export class TableStudentsComponent implements OnInit {
  students: Student[];

  constructor(private baseService: BaseServiceService,
    public dialog: MatDialog,) {
    this.students = [];
  }

  ngOnInit(): void {
    console.log("TableStudentComponent");
    this.baseService.getAllStudents().subscribe(data => this.students = data);
  }

  addNewStudent(): void {
    const dialogAddingNewStudent =
    this.dialog.open(DialogEditWrapperComponent,
      {
        width: '400px',
        data: null
      });
    dialogAddingNewStudent.afterClosed().subscribe((result: Student) => {
      if (result != null) {
        console.log("adding new student: " + result.name);
        this.baseService.addNewStudent(result).subscribe(k=>
          this.baseService.getAllStudents().subscribe(data =>
            this.students = data));
      }
    });
  }
}
