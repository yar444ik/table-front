import { Student } from 'src/app/models/students';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {
  private studentsUrl = 'api/students';

  constructor(private http: HttpClient) {  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }
  addNewStudent(student: Student): Observable<Student> {
    console.log('addNewStudent');
    return this.http.post<Student>(this.studentsUrl, student).pipe();
  }

  // getStudent(student: Student): Observable<Student> {
  //   const url = `${this.studentsUrl}/${student.id}`;
  //   return this.http.get<Student>(url).pipe();
  // }

  putStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(this.studentsUrl, student).pipe();
  }

  delStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}/${student.id}`;
    debugger
    return this.http.delete<Student>(url).pipe();
  }
}
