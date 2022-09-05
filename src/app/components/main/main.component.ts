import { Component, OnInit } from '@angular/core';
import {DarkModeService} from "../../dark-mode.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = 'ToDO';
  isDark:boolean=false

  constructor(private darkMode:DarkModeService) {

  }

  ngOnInit(): void {
    this.darkMode.mode$.subscribe(el=>this.isDark=el)
  }
}
