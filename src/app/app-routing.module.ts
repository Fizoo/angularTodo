import {NgModule} from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {MainComponent} from './components/main/main.component';

const routes: Routes = [
  {path: '', component:MainComponent},
  {path: 'login', component: LoginComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }