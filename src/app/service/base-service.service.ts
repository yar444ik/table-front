import { Student } from 'src/app/models/students';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {
  private studentsUrl = 'api/base/students';

  constructor(private http: HttpClient) {  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('api/base/students').pipe(catchError(error => {
      console.error('Error fetching students:', error);
      return throwError(() => new Error('Failed to fetch students'));
    }));
  }
  addNewStudent(student: Student): Observable<Student> {
    return this.http.post<Student>('api/base/students', student);
  }

  putStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}/`;
    return this.http.put<Student>(url, student);
  }

  delStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}/${student.id}`;
    return this.http.delete<Student>(url);
  }
}
