import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'e-commerce-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
 
  constructor() {}

  ngOnInit(): void {
    console.log("product")
  }
}
