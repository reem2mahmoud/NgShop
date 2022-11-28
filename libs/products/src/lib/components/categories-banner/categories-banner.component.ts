import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category, CategoryService } from '@e-commerce/categories';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',

})
export class CategoriesBannerComponent implements OnInit , OnDestroy {


  categories: Category[] = []
  endSubs:Subject<any> = new Subject()
  constructor(private _categoryService: CategoryService) { }
 

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this._categoryService
    .getCategoriesList()
    .pipe(takeUntil(this.endSubs))
    .subscribe(response => {
      this.categories = response.data
    })
  }

  ngOnDestroy(): void {
  //  this.endSubs.next();
   this.endSubs.complete();

  }

}
