import { Student } from 'src/app/models/students';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.scss']
})
export class TableStudentsComponent implements OnInit {
  students: Student[] | undefined;

  constructor() {
    this.students = [{id: 0, name: 'Имя', surname: 'Фамилия'},
      {id: 1, name: 'Имя 1', surname: 'Фамилия 1'},
      {id: 2, name: 'Имя 2', surname: 'Фамилия 2'},
    ];

  }

  ngOnInit(): void {
  }

}
