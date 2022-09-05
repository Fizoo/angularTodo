import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public info$ = new Subject<string>();

  constructor() {
  }

  addInfo(value:string){
    this.info$.next(value)
  }
}
