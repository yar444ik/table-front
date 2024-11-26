//import { Student } from './../models/students';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const students = [
      {id: 0, name: 'Ethan', surname: 'Wright', group: 'VM'},
      {id: 1, name: 'Lily', surname: 'Chen', group: 'AM'},
      {id: 2, name: 'Julian', surname: 'Ross', group: 'VM'},
      {id: 3, name: 'Ava', surname: 'Lee', group: 'AM'},
      {id: 4, name: 'Oliver', surname: 'Hall', group: 'VM'},
      {id: 5, name: 'Emily', surname: 'Patel', group: 'VM'},
      {id: 6, name: 'Benjamin', surname: 'Brown', group: 'AM'},
      {id: 7, name: 'Sophia', surname: 'Martin', group: 'AM'},
      {id: 8, name: 'Alexander', surname: 'Davis', group: 'AM'},
      {id: 9, name: 'Isabella', surname: 'Taylor', group: 'VM'},
      {id: 10, name: 'Michael', surname: 'Kim', group: 'AM'},
    ];
    return {students};
  }

  // genId(students: Student[]): number {
  //   return  students.length > 0 ? Math.max(...students.map(student => student.id ? student.id : 0)) + 1 : 11;
  // }
}
