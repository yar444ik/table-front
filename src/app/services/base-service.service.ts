import { Student } from 'src/app/models/student';
import { Page } from 'src/app/models/page';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RegistrationRequest } from '../dtos/RegistrationRequest';
import { LoginResponse } from '../dtos/LoginResponse';
import { LoginRequest } from '../dtos/LoginRequest';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  private studentsUrl = '/api/base/students';
  private loginUrl = '/api';


  constructor(private http: HttpClient, private router: Router, private storage: LocalStorageService) {  }

  private handleError(error: HttpErrorResponse){
    if (error.status == 403) {
      console.error('403: У вас нет привелегий на данную операцию!');
      alert('У вас нет прав на данную операцию!');
    }else {
      console.error('Произошла ошибка:', error);
    }
    return throwError('Произошла ошибка. Пожалуйста попробуйте ещё раз.')
  }

  private loginError(error: HttpErrorResponse){
    if (error.status == 403){
      console.error('Неверный пароль!');
      alert('Неверный пароль!');
    }else {
      console.error('Произошла ошибка:', error);
    }
    return throwError('Произошла ошибка. Пожалуйста попробуйте ещё раз.')
  }

  getAllStudents(page: number, size: number, sortField: string, sortDirection: string): Observable<Page<Student>> {
    return this.http.get<Page<Student>>(`${this.studentsUrl}`, {
      params: {
        page: page.toString(),
        size: size.toString(),
        sortField: sortField,
        sortDirection: sortDirection
      }
    });
  }
  addNewStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.studentsUrl}`, student).pipe();
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
    const url = `${this.studentsUrl}/${studentId}`;
    return this.http.delete<void>(url);
  }

  // getStudentById(studentId: number): Observable<Student> {
  //   const url = `${this.studentsUrl}/${studentId}`;
  //   return this.http.get<Student>(url);
  // }
  //
  // searchByFilter(filter: string, page: number, size: number, sortField: string, sortDirection: string): Observable<Page<Student>> {
  //  return this.http.get<Page<Student>>(`${this.studentsUrl}`, {
  //    params: {
  //      filter: filter,
  //      page: page.toString(),
  //      size: size.toString(),
  //      sortField: sortField,
  //      sortDirection: sortDirection
  //    }
  //  });
  // }

  register(regRequest: RegistrationRequest): Observable<RegistrationRequest>{
    console.log('Registration new user!');
    return this.http.post<RegistrationRequest>(`${this.loginUrl}/register`, regRequest);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.loginUrl}/login`, loginRequest).pipe(catchError(this.loginError));
  }
}

