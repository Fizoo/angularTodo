import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {ICategory} from "../model/todoType";

import {HttpClient} from "@angular/common/http";
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url='https://todo-49762-default-rtdb.firebaseio.com/category'

  constructor(private http:HttpClient,
              private alertService:AlertService
              ) {
  }

  getAll():Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url+'.json').pipe(
      map((el:any)=>{
        return Object.keys(el).map(key=>({
          ...el[key]
        }))
      })
    )
  }

  addCategory(item: ICategory) {
    this.alertService.addInfo('Add new Category')
    return this.http.post(this.url+'.json',item)
  }


}
