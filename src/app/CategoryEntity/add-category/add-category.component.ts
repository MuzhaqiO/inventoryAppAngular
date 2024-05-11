import { Component, Inject } from '@angular/core';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatInputModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  category: Category = {
    id: 0,
    name: ''
  }
    constructor(private categoryService: CategoryService, private router: Router, private dialogRef: MatDialogRef<AddCategoryComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

    ngOnInit(): void {
      if(this.data){
        this.category = this.data
      }
    }

    saveCategory(){
      if(this.data){
        this.categoryService.updateCateory(this.data.id, this.category).subscribe(
          {
            next: (res: Category) => {
              alert('Category updated');
              console.log(res);
              this.dialogRef.close(true);
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
            }
          }
        );
      } else {
      this.categoryService.createCategory(this.category).subscribe(
        {
          next: (res: Category) => {
            alert('Category was added');
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

    onSubmit(){
      console.log(this.category);
      this.saveCategory();
    }
    closeDialog(){
      this.dialogRef.close(false);
    }
}
