import { Student } from 'src/app/models/students';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-editor',
  templateUrl: './student-editor.component.html',
  styleUrls: ['./student-editor.component.scss']
})
export class StudentEditorComponent implements OnInit {
  editingStudent: Student = new Student;
  //editingStudent!: Student;

  constructor() { }

  ngOnInit(): void {
  }

}
