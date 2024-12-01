import { Student } from 'src/app/models/students';
import { Page } from 'src/app/models/page';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  constructor(private http: HttpClient) {  }

  getAllStudents(page: number, size: number, sortField: string, sortDirection: string): Observable<Page<Student>> {
    return this.http.get<Page<Student>>('api/base/students', {
      params: {
        page: page.toString(),
        size: size.toString(),
        sortField: sortField,
        sortDirection: sortDirection
      }
    });
  }
  addNewStudent(student: Student): Observable<Student> {
    return this.http.post<Student>('api/base/students', student).pipe();
  }

  putStudent(student: Student): Observable<Student> {
    if (student.id != null) {
      const url = `api/base/students/${student.id}`;
      return this.http.put<Student>(url, student);
    } else {
      throw new Error('Student ID is null');
    }
  }

  delStudent(studentId: number): Observable<void> {
    const url = `${'api/base/students'}/${studentId}`;
    return this.http.delete<void>(url);
  }

  getStudentById(studentId: number): Observable<Student> {
    const url = `${'api/base/students'}/${studentId}`;
    return this.http.get<Student>(url);
  }

  searchByFilter(filter: string, page: number, size: number, sortField: string, sortDirection: string): Observable<Page<Student>> {
    return this.http.get<Page<Student>>('api/base/students/search', {
      params: {
        filter: filter,
        page: page.toString(),
        size: size.toString(),
        sortField: sortField,
        sortDirection: sortDirection
      }
    });
  }
}

