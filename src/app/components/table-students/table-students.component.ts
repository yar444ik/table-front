import { Student } from 'src/app/models/students';
import { DialogEditWrapperComponent } from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { BaseServiceService } from './../../service/base-service.service';
import { DialogAddWrapperComponent } from '../student-editor/dialog-add-wrapper/dialog-add-wrapper.component';
import { DialogDeleteWrapperComponent } from '../student-editor/dialog-delete-wrapper/dialog-delete-wrapper.component';
import { FilterService } from 'src/app/service/filterService';

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

export class TableStudentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'surname', 'group','functions'];
  dataSource!: MatTableDataSource<Student>;
  totalElements: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  sortField: string = 'id';
  sortDirection: string = 'asc';
  currentFilter: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private baseService: BaseServiceService,
    public dialog: MatDialog,
    private filterService: FilterService,) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    const savedFilter = this.filterService.getFilterValue();
      if (savedFilter) {
        this.currentFilter = savedFilter;
        this.filterResults(savedFilter, this.pageIndex, this.pageSize, this.sortField, this.sortDirection);
      } else {
        this.getStudents(this.pageIndex, this.pageSize, this.sortField, this.sortDirection);
      }
  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterResults(filter: string, pageIndex: number, pageSize: number, sortField: string, sortDirection: string) {
    this.currentFilter = filter;
    this.filterService.setFilterValue(filter);
    this.baseService.searchByFilter(filter, pageIndex, pageSize, sortField, sortDirection).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.totalElements = data.totalElements;
      this.pageSize = data.size;
      this.pageIndex = data.number;
      this.paginator.length = this.totalElements;
      this.dataSource.sort = this.sort;
    });
  }

  onPageChange(event: any) {
    const savedFilter = this.filterService.getFilterValue();
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    if (savedFilter) {
      this.filterResults(savedFilter, pageIndex, pageSize, this.sortField, this.sortDirection);
    } else {
      this.getStudents(pageIndex, pageSize, this.sortField, this.sortDirection);
    }
  }

  getStudents(pageIndex: number, pageSize: number, sortField: string, sortDirection: string) {
    if (this.currentFilter) {
      this.filterResults(this.currentFilter, pageIndex, pageSize, sortField, sortDirection);
    } else {
    this.baseService.getAllStudents(pageIndex, pageSize, sortField, sortDirection).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.totalElements = data.totalElements;
      this.pageSize = data.size;
      this.pageIndex = data.number;
      this.paginator.length = this.totalElements;
      this.dataSource.sort = this.sort; // Устанавливаем сортировку на клиенте
    });
  }
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
            this.getStudents(this.pageIndex, this.pageSize, this.sortField, this.sortDirection));
    }});
  }

  editStudent(student: Student): void {
    const dialogEditStudent =
    this.dialog.open(DialogEditWrapperComponent, {
      width: '400px',
      data: student,
    });
    dialogEditStudent.afterClosed().subscribe((result: Student) => {
      if (result != null) {
        console.log("edit student on: " + student.id);
        this.baseService.putStudent(result).subscribe(k=>
          this.baseService.putStudent(result).subscribe(() => this.getStudents(this.pageIndex, this.pageSize, this.sortField, this.sortDirection)));
      }
    });
  }

  deleteStudent(student: Student): void {
    const dialogDeletingStudent =
    this.dialog.open(DialogDeleteWrapperComponent, {
      width: '400px',
      data: student,
    });
    dialogDeletingStudent.afterClosed().subscribe((result: boolean)=> {
      if (result === true && student.id != null) {
        console.log("delete student: " + student.name);
        this.baseService.delStudent(student.id).subscribe(() => this.getStudents(this.pageIndex, this.pageSize, this.sortField, this.sortDirection));
      }
    });
  }
}
