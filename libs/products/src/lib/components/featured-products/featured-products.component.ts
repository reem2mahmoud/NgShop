import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { Subject , takeUntil } from 'rxjs';

@Component({
  selector: 'products-featured-product',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit , OnDestroy {

  products: Product[] = []
  endSubs:Subject<any> = new Subject()

  constructor(private _productsService: ProductsService) { }


  ngOnInit(): void {

    this._getFeaturedProducts()
  }

  _getFeaturedProducts() {
    this._productsService
    .getFeaturedProducts(4)
    .pipe(takeUntil(this.endSubs))
    .subscribe(response => {
      this.products = response.data
    })

  }

  ngOnDestroy(): void {
    // this.endSubs.next();
     this.endSubs.complete();
  }
}