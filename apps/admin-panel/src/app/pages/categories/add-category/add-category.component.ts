/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryService } from '@e-commerce/categories';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  btnClicked: boolean = false;
  editMode: boolean = false;
  currentId: string 

  constructor(
    private formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color:['#ffffff']
    });
    this.checkMode();
  }
  createNewCategory() {
    this.btnClicked = true;
    if (this.categoryForm.invalid) {
      return;
    }

    const category = this.categoryForm.value;
    if (this.editMode) {
      this.updateCategory(category);
    } else {
      this.addCategory(category);
    }
  }
  cancel(){
    this.location.back();
  }
  get formData() {
    return this.categoryForm.controls;
  }
  private checkMode() {
    this.route.params.subscribe((params) => {
      console.log(params);

      if (params['cat_id']) {
        this.editMode = true;
        this.currentId = params['cat_id']
        this._categoryService
          .getCategory(params['cat_id'])
          .subscribe((response) => {
            this.categoryForm.patchValue(response.data);
          });
      }
    });
  }
  private addCategory(category: Category) {
    this._categoryService.createCategory(category).subscribe(
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
  private updateCategory(category: Category) {
    category._id = this.currentId
    this._categoryService.updateCategory(category)
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

}
