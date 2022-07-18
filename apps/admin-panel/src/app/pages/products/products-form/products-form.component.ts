import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsService } from '@e-commerce/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common' ;
import { timer } from 'rxjs';
import { Category, CategoryService } from '@e-commerce/categories';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {

  editMode:boolean = false 
  productForm:FormGroup
  currentId: string 
  btnClicked:boolean = false 
  categories:Category[] = []
  imageUploaded : string | ArrayBuffer
  
  constructor( 
    private formBuilder: FormBuilder ,
    private _productService: ProductsService,
    private _categoriesService: CategoryService ,
    private _messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initProdutForm()
    this.getCategories()
  }


  initProdutForm(){
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      isFeatured:[false] ,
      is_avaliable:[''],
      size:[''],
      color:[''] ,
      discount:[''] ,
      images:[''] ,
      image:['' , Validators.required]
      
    })
    this.checkMode() 
  }
  getCategories(){
    this._categoriesService.getCategoriesList().subscribe(response=>{
      this.categories = response.data
    })
  }
  createNewProduct() {
    this.btnClicked = true;
    if (this.productForm.invalid) {
      return;
    }
    const productData =new FormData()
   
    Object.keys(this.productForm.controls).map((key)=>{
      productData.append(key,this.productForm.value[key])
    })

    if (this.editMode) {
      console.log(  "update in controller  " , this.productForm)
     this.updateProduct(productData);
    } else {
      console.log(productData ,  "add in controller  ")
      this.addProduct(productData);
    }
  }
  private checkMode() {
    this.route.params.subscribe((params) => {
    

      if (params['prod_id']) {
        this.editMode = true;
        this.currentId = params['prod_id']
        this.getProduct()
        
      }
    });
  }
  get formData() {
    return this.productForm.controls;
  }
  getProduct(){
    this._productService
    .getProduct( this.currentId )
    .subscribe((response) => {
      this.productForm.patchValue(response.data);
      this.imageUploaded = response.data.image
      this.productForm.controls['category'].setValue(response.data.category._id)
      this.productForm.controls['image'].setValidators([])
      this.productForm.controls['image'].updateValueAndValidity()

    });
  }
  private addProduct(product: FormData) {
    this._productService.createProduct(product).subscribe(
      (response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: response.message,
        });
        timer(2000).subscribe(() => {
          this.location.back();
        });
      },
      (error) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: error.message,
        });
      }
    );
  }
  private updateProduct(productFormData : FormData){

    this._productService.updateProduct(productFormData , this.currentId)
    .subscribe((response) => {
      this._messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: response.message,
      });
      timer(2000).subscribe(() => {
        this.location.back();
      });
    }  , (error) => {
      this._messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: error.message,
      });
    });
  }
  cancel(){
    this.location.back();
  }
  onImageUpload(event:any){
    const file = event.target.files[0]
    if(file){
      console.log( 'file' , file)
      this.productForm.patchValue({image:file})
      this.productForm.updateValueAndValidity() 
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = ()=>{
        this.imageUploaded = fileReader.result ? fileReader.result  : ''
      }
    }
  }
}
