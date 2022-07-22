import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IList} from "../model/todoType";
import {DataBaseService} from "./dataBase.service";
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _tasks$ = new BehaviorSubject<IList[]>([])
  private dataStore: IList[]=[]
  private tempDataStore: IList[] =[]
  readonly tasks$ = this._tasks$.asObservable()

  constructor(private dataBase:DataBaseService,
              private infoService:AlertService
              ) {
    this.dataBase.getAllTasks().subscribe(el=>{
      this._tasks$.next(el)
      this.dataStore=el
    })
  }

  addTask(task: IList) {
    this.dataStore.push(task)
    this.getNext()
    this.dataBase.addTask(task).subscribe()
    this.infoService.addInfo('Add new task success')
  }

  remove(id:number){
    this.dataStore= this.dataStore.filter(el=>el.id!==id)
    this.getNext()
    this.dataBase.removeTask(id).subscribe()
    this.infoService.addInfo('Delete task ')
  }

  checkTask(item: IList){
    this.dataStore=this.dataStore.map(el=>{
      if(el.id===item.id){
        const isCheck=el.status
        return {...el,status:!isCheck}
      }
      else return el
    })
    this.getNext()
    this.dataBase.uploadTask({...item,status:!item.status}).subscribe()
  }

  updateTask(item:IList){
    this.dataStore=this.dataStore.map(el=>el.id===item.id?item:el)
    this.getNext()
    this.dataBase.uploadTask(item).subscribe()
    this.infoService.addInfo('Update success')
  }

  loadTaskOf(item:string){
      this.tempDataStore=this.dataStore
      this.tempDataStore=this.tempDataStore.filter(el=>el.category.name===item)
      this._tasks$.next(this.tempDataStore)
  }

  getNext(){
    this._tasks$.next(this.dataStore)
  }

  getItemCountInCategory(item:string):number{
    return  this.dataStore.filter((el:IList)=>el.category.name===item).length
  }

}
