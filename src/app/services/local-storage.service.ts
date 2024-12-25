import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(item: string){
    return localStorage.getItem(item);
  }

  deleteItem(item: string){
    localStorage.removeItem(item);
  }

  setItem(nameItem: string, item: string){
    localStorage.setItem(nameItem, item);
  }
}
