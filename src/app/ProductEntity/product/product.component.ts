import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { Product } from './product';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from './product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryComponent } from '../../CategoryEntity/category/category.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent, MatIconModule, MatTableModule, CategoryComponent, ProductComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  dataSource: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];

  constructor(private productService: ProductService, private _dialog: MatDialog){}

  openAddProductDialog(){
    const dialogRef = this._dialog.open(AddProductComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      }
    })
  }

  openEditProductDialog(data: any){
    this._dialog.open(AddProductComponent, {
      data
    });
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.productService.getProducts().subscribe(
      {
        next: (res: Product[]) => {
          this.dataSource = res;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        alert('Product was deleted');
        this.getProductList();
      },
      error: console.log
    });
  }
}
