import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@e-commerce/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products:Product[]
  constructor(
    private _productsService: ProductsService ,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService) {}

  ngOnInit(): void {
      this.showProductsList() 
  }

  showProductsList(){
    this._productsService.getProductsList().subscribe(response=>{
       this.products = response.data ;
       console.log(this.products )
    })
  }
  deleteProduct(prodId: string) {
    this._confirmationService.confirm({
      message: 'Do you delete this product',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._productsService.deleteProduct(prodId).subscribe(response => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success Message',
            detail: response.message,
          });
          this.showProductsList()
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
