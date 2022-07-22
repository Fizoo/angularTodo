import { Pipe, PipeTransform } from '@angular/core';
import {IList} from "../../model/todoType";

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform(list: IList[], search:string='',priority:string='',category=''): IList[] {


    if(search.length===0 && priority.length===0 && category.length===0){
      return list
    }

    if(search.length!==0){

     list=list.filter(el=>el.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(priority.length!==0&&priority!=='All'){
      list=list.filter(el=>el.priority.name===priority)

    }
    if(category.length!==0){
      list=list.filter(el=>el.category.name===category)
    }

    return list
  }

}
