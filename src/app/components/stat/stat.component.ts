import {Component, OnDestroy, OnInit} from '@angular/core';
import {TasksService} from "../service/tasks.service";
import {IList} from "../../model/todoType";
import {Subscription} from "rxjs";


export type IStat = RootObjectChild[];
export interface RootObjectChild {
  name: string;
  icon: string;
  count: string;
  stylesForNumber: number;
  colors: string;

}

interface PieType {
  name: string
  count: number
}

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],

})
export class StatComponent implements OnInit ,OnDestroy{

  aSub:Subscription
  allCount: number = 0
  completedCount: number = 0
  notCompletedCount: number = 0
  completedProgress: number = 0
  notCompletedProgress: number = 0
  stat: IStat

  pieTotal: PieType[] = []
  pieTotalProgress: PieType[] = []
  piePriority: PieType[] = []
  pieCategory: PieType[] = []
  options:any

  constructor(private dataObsService: TasksService,
             ) {
  }


  ngOnInit(): void {

   this.aSub= this.dataObsService.tasks$.subscribe(el => {
      this.allCount = el.length
      this.completedCount = el.filter((el: IList) => el.status).length
      this.notCompletedCount = el.filter((el: IList) => !el.status).length
      this.completedProgress = Math.floor((this.completedCount / this.allCount) * 100)
      this.notCompletedProgress = Math.floor((this.notCompletedCount / this.allCount) * 100)

      this.pieTotal = [
        {
          name: 'Completed',
          count: this.completedCount
        },
        {
          name: 'NoCompleted',
          count: this.notCompletedCount
        }
      ]

      this.pieTotalProgress=[
        {
          name:'Completed',
          count:this.completedProgress
        },
        {
          name:'Not Completed',
          count:this.notCompletedProgress
        }
      ]

      this.piePriority=this.count(el.map(a=>a.priority.name))

      this.pieCategory=this.count(el.map(a=>a.category.name))

      this.options=[
        {
        title:'Total statistic',
        type:"doughnut",
        palette:"material",
        dataSource:this.pieTotal,
          icon:'bi bi-graph-up-arrow ',
          custom:(arg:any)=> `${arg.valueText}`
      },{
        title:'Total statistic %',
        type:"doughnut",
        palette:"dark violet",
        dataSource:this.pieTotalProgress,
          icon:'bi bi-bar-chart-fill',
          custom:(arg:any)=> `${arg.valueText}%`
      }
        ,{
          title:'',
          type:"pie",
          palette:"violet",
          dataSource:this.piePriority,
          icon:'bi bi-pie-chart-fill',
          custom:(arg:any)=>`${arg.valueText} (${arg.percentText})`
        },
        {
          title:'',
          type:"pie",
          palette:"pastel",
          dataSource:this.pieCategory,
          icon:'bi bi-pie-chart-fill',
          custom:(arg:any)=> `${arg.valueText} (${arg.percentText})`
        }
      ]
    })
  }

   count(el:string[])  {
    const states =el.reduce((obj:any, name:string) => {
      obj[name] = (obj[name] || 0) + 1
      return obj
    }, {})
    return Object.keys(states).map(name => ({name, count: states[name]}) )
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

}

