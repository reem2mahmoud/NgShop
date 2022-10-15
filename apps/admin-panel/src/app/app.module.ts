//BUILTIN MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//COMPONENT
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { AddCategoryComponent } from './pages/categories/add-category/add-category.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';

//SERVICES
import { CategoryService } from '@e-commerce/categories';
import { MessageService, ConfirmationService } from 'primeng/api';

//UX MODULES
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { UsersListComponent } from './pages/users/users-list/users-list.component'
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UsersServices } from '@e-commerce/users';
import { ProductsService } from '@e-commerce/products';

const UX_MODULES = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
];

const SERVICES =[
  CategoryService,
  ProductsService,
  UsersServices,
  MessageService,
  ConfirmationService , 
]

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoriesListComponent,
      },
      {
        path: 'categories/category-form',
        component: AddCategoryComponent,
      },
      {
        path: 'categories/category-form/:cat_id',
        component: AddCategoryComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/product-form',
        component: ProductsFormComponent,
      },
      {
        path: 'products/product-form/:prod_id',
        component: ProductsFormComponent,
      },
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'users/salesMan-form',
        component: UserFormComponent,
      },
      {
        path: 'users/salesMan-form/:user_id',
        component: UserFormComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    SidebarComponent,
    DashboardComponent,
    CategoriesListComponent,
    AddCategoryComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ...UX_MODULES,
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent],
  exports: [AddCategoryComponent],
})
export class AppModule {}
