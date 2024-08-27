import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {
  private counter = 0;

  nextId(): number {
    return this.counter++;
  }
}
