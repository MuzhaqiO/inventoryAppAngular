import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../CategoryEntity/category/category';
import { CategoryService } from '../../CategoryEntity/category/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatInputModule, MatSelectModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  product: Product = {
    id: 0,
    name: '',
    price: 0,
    categories: []
  };
  selectedCategories: Category[] = [];
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router, private dialogRef: MatDialogRef<AddProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    if(this.data){
      this.product = this.data
    }

    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  saveProduct() {
    this.product.categories = this.selectedCategories;
    if(this.data){
    this.productService.updateProduct(this.data.id, this.product).subscribe(
      {
        next: (res: Product) => {
          alert('Product was updated');
          console.log(res);
          this.dialogRef.close(true);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  } else {
    this.productService.createProduct(this.product).subscribe(
      {
        next: (res: Product) => {
          alert('Product was added');
          console.log(res);
          this.dialogRef.close(true);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }
  }

  onSubmit() {
    console.log(this.product);
    this.saveProduct();
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
