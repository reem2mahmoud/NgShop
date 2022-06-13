//BUILTIN MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule , Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//COMPONENT
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { AddCategoryComponent } from './pages/categories/add-category/add-category.component';
//SERVICES
import { CategoryService } from '@e-commerce/categories';
import { MessageService  , ConfirmationService} from 'primeng/api';



//UX MODULES
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';




const UX_MODULES=[
  CardModule ,
  ToolbarModule,
  ButtonModule ,
  TableModule ,
  InputTextModule,
  ToastModule ,
  ConfirmDialogModule,
  ColorPickerModule
]


const routes : Routes = [
  {
    path: '' ,
    component : ShellComponent ,
    children :[
      {
        path: 'dashboard' ,
        component : DashboardComponent ,
      },
      {
        path: 'categories' ,
        component : CategoriesListComponent ,
      },
      {
        path: 'categories/category-form' ,
        component : AddCategoryComponent ,
      },
      {
        path: 'categories/category-form/:cat_id' ,
        component : AddCategoryComponent ,
      }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent, 
    ShellComponent, 
    SidebarComponent, 
    DashboardComponent, 
    CategoriesListComponent,
    AddCategoryComponent ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    ReactiveFormsModule ,
    BrowserAnimationsModule ,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ...UX_MODULES
  ],
  providers: [CategoryService ,
              MessageService , 
              ConfirmationService],
  bootstrap: [AppComponent],
  exports: [
    AddCategoryComponent
  ],
})
export class AppModule {}
