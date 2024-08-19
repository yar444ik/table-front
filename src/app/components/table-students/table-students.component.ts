import { BaseServiceService } from './../../service/base-service.service';
import { Student } from 'src/app/models/students';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.scss']
})
export class TableStudentsComponent implements OnInit {
  students: Student[];

  constructor(private baseService: BaseServiceService) {
    this.students = [];
  }

  ngOnInit(): void {
    console.log("TableStudentComponent");
    this.students = this.baseService.getAllStudents();
  }

}
