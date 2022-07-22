import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FilterCategoryPipe} from './components/navigation/filter-category.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ColorPrDirective} from './components/table-list/color-pr.directive';
import {FilterNamePipe} from './components/table-list/filter-name.pipe';
import {NavigationComponent} from './components/navigation/navigation.component';
import {StatComponent} from './components/stat/stat.component';
import {TableListComponent} from './components/table-list/table-list.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import { DxPieChartModule} from "devextreme-angular";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    AppComponent,
    FilterCategoryPipe,
    ColorPrDirective,
    FilterNamePipe,
    NavigationComponent,
    StatComponent,
    TableListComponent,
    NavbarComponent

  ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        DxPieChartModule,
        NgxPaginationModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
