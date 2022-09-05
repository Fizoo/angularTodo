import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICategory, IList, IPriority} from "../../model/todoType";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../service/category.service";
import {TasksService} from "../service/tasks.service";
import {priority} from 'src/assets/dataPriority';
import {AlertService} from "../service/alert.service";
import {Subscription} from "rxjs";

interface ITemp {
  name: string
  priority: string
  category: string
}

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit,OnDestroy {

  aSub:Subscription
  bSub:Subscription
  cSub:Subscription

  list: IList[] = []
  form: FormGroup;
  priorities: IPriority[]
  categories: ICategory[]
  tempTask: ITemp = {
    name: '',
    category: '',
    priority: ''
  }

  updateItemOfTask: IList
  search: string
  selectPriority: string = 'All'
  selectCategory: string
  textInfo: string=''
  page: number = 1;


  constructor(
    private categoryService: CategoryService,
    private tasksService: TasksService,
    private infoService: AlertService
  ) {}

  ngOnInit(): void {
    // this.database.getAllTasks().subscribe(el=>this.list = el)
   this.bSub= this.tasksService.tasks$.subscribe(el => this.list = el)
   this.cSub= this.categoryService.getAll().subscribe(el => this.categories = el)
    this.priorities = priority

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      priority: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    })

    this.aSub=this.infoService.info$.subscribe(el=> {
      this.textInfo = el
      setTimeout(()=>{
        this.textInfo=''
      },2000)
    })

  }

  remove(id: number) {
    this.tasksService.remove(id)
  }

  checkTask(item: IList) {
    this.tasksService.checkTask(item)
  }

  updateTask(item: IList) {
    this.tempTask = {
      name: item.name,
      priority: item.priority.name,
      category: item.category.name
    }
    this.updateItemOfTask = {
      ...item
    }
  }

  submit() {
    const item: IList = {
      name: this.form.value.name,
      date: Date.now(),
      priority: {name: this.form.value.priority.name,id:this.form.value.priority.id},
      category: {name: this.form.value.category},
      id: Date.now(),
      status: false
    }

    this.tasksService.addTask(item)
    this.form.reset()
  }

  submitUpdate() {

    const xName = this.form.value.name ? this.form.value.name : this.updateItemOfTask.name
    const xCategory = this.form.value.category ? this.form.value.category : this.updateItemOfTask.category.name
    const xPriority = this.form.value.priority ? this.form.value.priority : this.updateItemOfTask.priority.name

    const newTask = {
      ...this.updateItemOfTask,
      name: xName,
      category: {...this.updateItemOfTask.category, name: xCategory},
      priority: {...this.updateItemOfTask.priority, name: xPriority}
    }

    this.tasksService.updateTask(newTask)
  }

  get name() {
    return this.form.controls['name']
  }

  get category() {
    return this.form.controls['category']
  }

  get priority() {
    return this.form.controls['priority']
  }

  filterUpName() {
     this.list= this.list.sort((a,b)=> {
         let fa = a.name.toLowerCase()
         let fb = b.name.toLowerCase()
         return fa > fb ? 1 : fa < fb ? -1 : 0
       }
     )
  }

  filterDownName() {
    this.list= this.list.sort((a,b)=> {
        let fa = a.name.toLowerCase()
        let fb = b.name.toLowerCase()
        return fa > fb ? -1 : fa < fb ? 1 : 0
      }
    )
  }

  filterUpDate() {
    this.list=this.list.sort((a,b)=>a.date-b.date)
  }

  filterDownDate() {
    this.list=this.list.sort((a,b)=>b.date-a.date)
  }

  filterUpPriority() {
    this.list=this.list.sort((a,b)=>a.priority.id-b.priority.id)
  }

  filterDownPriority() {
    this.list=this.list.sort((a,b)=>b.priority.id-a.priority.id)
  }

  filterUpCategory() {
    this.list= this.list.sort((a,b)=>a.category.name>b.category.name?1:a.category.name<b.category.name?-1:0)
  }

  filterDownCategory() {
    this.list= this.list.sort((a,b)=>a.category.name>b.category.name?-1:a.category.name<b.category.name?1:0)
  }

  ngOnDestroy() {
    if (this.aSub){
      this.aSub.unsubscribe()
    }
    if (this.bSub){
      this.bSub.unsubscribe()
    }
    if (this.cSub){
      this.cSub.unsubscribe()
    }
  }

}
