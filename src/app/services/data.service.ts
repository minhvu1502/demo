import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private listRecipes = new BehaviorSubject([]);
  currentListRecipes = this.listRecipes.asObservable();
  setListRecipes(list:any){
    this.listRecipes.next(list);
  }
  constructor() { }
}
