import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '@e-commerce/categories';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',

})
export class CategoriesListComponent implements OnInit {

  constructor(private _categoryService: CategoryService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService) { }

  categories: Category[] = []

  ngOnInit(): void {

    this.showCategoryList()

  }
  showCategoryList() {
    this._categoryService.getCategoriesList().subscribe(response => {
      this.categories = response.data
      console.log(response)
    })
  }
  deleteCategory(categoryId: string) {
    this._confirmationService.confirm({
      message: 'Do you delete this category',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._categoryService.deleteCategory(categoryId).subscribe(response => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success Message',
            detail: response.message,
          });
          this.showCategoryList()
        }, error => {
          this._messageService.add({
            severity: 'error',
            summary: 'Error Message',
            detail: error.message,
          });
        })
      },
     
    });
  }

}
