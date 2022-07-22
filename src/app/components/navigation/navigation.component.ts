import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICategory} from "../../model/todoType";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../category.service";
import {TasksService} from "../tasks.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  count: number
  category: ICategory[]
  search: string = ''
  form!: FormGroup;
  isActive: string = ''
  aSub: Subscription
  bSub: Subscription
  cSub: Subscription


  constructor(private categoryService: CategoryService,
              private tasksService: TasksService) {
  }

  ngOnInit(): void {
    this.aSub = this.categoryService.getAll().subscribe(el => this.category = el)
    this.bSub = this.tasksService.tasks$.subscribe(el => this.count = el.length)

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      icon: new FormControl('')
    })
  }


  submit() {
    const item = {
      name: this.form.value.name,
      icon: this.form.value.icon,
      id: Date.now()
    }
    this.cSub = this.categoryService.addCategory(item).subscribe(() => {
      this.category.push(item)
    })
  }

  getItemCount(item: string): number {
    return this.tasksService.getItemCountInCategory(item)
  }

  loadTaskOfCategory(item: string) {
    if (item === '') {
      this.tasksService.getNext()
    } else
      this.tasksService.loadTaskOf(item)
    this.isActive = item
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
    if (this.bSub) {
      this.bSub.unsubscribe()
    }
    if (this.cSub) {
      this.cSub.unsubscribe()
    }
  }

}
