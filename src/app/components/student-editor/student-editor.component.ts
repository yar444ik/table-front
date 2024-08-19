import { BaseServiceService } from './../../service/base-service.service';
import { Student } from 'src/app/models/students';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-editor',
  templateUrl: './student-editor.component.html',
  styleUrls: ['./student-editor.component.scss']
})
export class StudentEditorComponent implements OnInit {
  editingStudent: Student;// = new Student;
  //editingStudent!: Student;

  constructor(private baseService: BaseServiceService) {
    this.editingStudent = new Student();
  }

  addStudent(): void {
    this.baseService.addNewStudent(this.editingStudent);
    this.editingStudent = new Student();
  }

  ngOnInit(): void {
  }

}
