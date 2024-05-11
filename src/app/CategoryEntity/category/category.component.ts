import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from './category';
import { CategoryService } from './category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AddCategoryComponent } from '../add-category/add-category.component';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NavbarComponent, CategoryComponent, CommonModule, MatTableModule, MatIconModule, AddCategoryComponent, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  dataSource: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private categoryService: CategoryService, private _dialog: MatDialog){}

  openAddCategoryDialog(){
    const dialogRef = this._dialog.open(AddCategoryComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategoryList();
        }
      }
    })
  }

  openEditCategoryDialog(data: any){
      this._dialog.open(AddCategoryComponent, {
        data
      });
  }
// 39-43
  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList(): void {
    this.categoryService.getCategories().subscribe(
      {
        next: (res: Category[]) => {
          this.dataSource = res;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (res) => {
        alert('Category deleted');
        this.getCategoryList();
      },
      error: console.log
    });
  }

}
