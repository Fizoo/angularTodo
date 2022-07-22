import { Component } from '@angular/core';
import {DarkModeService} from "./dark-mode.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDO';
  isDark:boolean=false

  constructor(private darkMode:DarkModeService) {
    this.darkMode.mode$.subscribe(el=>this.isDark=el)
  }
}
