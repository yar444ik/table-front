//import { Student } from './../models/students';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const students = [
      {id: 0, name: 'Ethan', surname: 'Wright'},
      {id: 1, name: 'Lily', surname: 'Chen'},
      {id: 2, name: 'Julian', surname: 'Ross'},
      {id: 3, name: 'Ava', surname: 'Lee'},
      {id: 4, name: 'Oliver', surname: 'Hall'},
      {id: 5, name: 'Emily', surname: 'Patel'},
      {id: 6, name: 'Benjamin', surname: 'Brown'},
      {id: 7, name: 'Sophia', surname: 'Martin'},
      {id: 8, name: 'Alexander', surname: 'Davis'},
      {id: 9, name: 'Isabella', surname: 'Taylor'},
      {id: 10, name: 'Michael', surname: 'Kim'},
    ];
    return {students};
  }

  // genId(students: Student[]): number {
  //   return  students.length > 0 ? Math.max(...students.map(student => student.id ? student.id : 0)) + 1 : 11;
  // }
}
