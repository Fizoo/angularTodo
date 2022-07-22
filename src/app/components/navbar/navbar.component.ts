import { Component, OnInit } from '@angular/core';
import {DarkModeService} from "../../dark-mode.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isActive:boolean

  constructor(private darkMode:DarkModeService) {
  }

  ngOnInit(): void {
    this.darkMode.mode$.subscribe(el=> {
      this.isActive = el
    })

  }

  mode(value:boolean) {
    this.darkMode.toggleMode(value)

  }
}
