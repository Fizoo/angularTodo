import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IList} from "../model/todoType";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private url='https://todo-49762-default-rtdb.firebaseio.com/tasks'

  constructor(private http:HttpClient) { }

  getAllTasks():Observable<IList[]>{
    return this.http.get<IList[]>(this.url+'.json').pipe(
      map((el:any)=>{
        return Object.keys(el).map(key=>({
          ...el[key],
          id:key
        }))
      })
    )
  }

  addTask(task:IList){
    return this.http.post(this.url+'.json',task)
  }

  removeTask(id:number){
    return this.http.delete<void>(`${this.url}/${id}.json`)
  }

  uploadTask(task:IList){
      return this.http.put(`${this.url}/${task.id}.json`,task)
  }

}
