import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from 'src/app/model/todoType';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(category: ICategory[], search:string=''): ICategory[] {
    if(search.length===0) {
      return category
    }
    return category.filter(el=>el.name.toLowerCase().includes(search.toLowerCase()))
  }

}
