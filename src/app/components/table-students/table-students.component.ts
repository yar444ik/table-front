import { Student } from 'src/app/models/students';
import { DialogEditWrapperComponent } from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { BaseServiceService } from './../../service/base-service.service';
import { DialogAddWrapperComponent } from '../student-editor/dialog-add-wrapper/dialog-add-wrapper.component';
import { DialogDeleteWrapperComponent } from '../student-editor/dialog-delete-wrapper/dialog-delete-wrapper.component';

import { Component, OnInit, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.scss']
})

export class TableStudentsComponent implements OnInit, AfterViewInit {
  students: Student[];

  displayedColumns: string[] = ['id', 'name', 'surname', 'group','functions'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private baseService: BaseServiceService,
    public dialog: MatDialog,) {
    this.students = [];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getStudents();
  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getStudents(): void {
    this.baseService.getAllStudents().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource._updateChangeSubscription();
    });
  }

  addNewStudent(): void {
    const dialogAddingNewStudent =
    this.dialog.open(DialogAddWrapperComponent,
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

  editStudent(student: Student): void {
    const editStudent = { ...student };
    const dialogEditStudent =
    this.dialog.open(DialogEditWrapperComponent, {
      width: '400px',
      data: editStudent,
    });
    dialogEditStudent.afterClosed().subscribe((result: Student) => {
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
}
