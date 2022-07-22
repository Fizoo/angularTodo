import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DarkModeService  {

  public mode$=new BehaviorSubject<boolean>(false)

  constructor() {
    const mod=localStorage.getItem('darkMode')==='true'
    this.mode$.next(mod)
  }

  toggleMode(value: boolean){
    localStorage.setItem('darkMode',String(value))
    this.mode$.next(value);
  }


}
