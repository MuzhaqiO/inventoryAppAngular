import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Bill } from '../bill/bill';
import { Type } from '../bill/type';
import { BillService } from '../bill/bill.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../CategoryEntity/category/category.service';
import { Category } from '../../CategoryEntity/category/category';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-add-bill',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatInputModule, CommonModule, MatNativeDateModule, MatDatepickerModule],
  providers: [DatePipe],
  templateUrl: './add-bill.component.html',
  styleUrl: './add-bill.component.css'
})
export class AddBillComponent {

  bill: Bill = {
    id: 0,
    date: new Date(),
    type: Type.BUY,
    transactions: [],
    category: {id:0, name:''},
    totalValue: 0
  }
  selectedCategory!: Category;
  categories: Category[] = [];

  constructor(private billService: BillService, private categoryService: CategoryService, private dialogRef: MatDialogRef<AddBillComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe){}

  ngOnInit() {
    if(this.data) {
      this.bill = this.data;
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
  saveBill(){
    const billWithCategoryId = {
      ...this.bill,
      categoryId: this.selectedCategory.id
    };
    const formattedDate = this.datePipe.transform(this.bill.date, 'dd-MM-yyyy')!;
    const params = new HttpParams().set('date', formattedDate);

    this.billService.createBill(billWithCategoryId, params).subscribe(
      {
        next: (res: Bill) => {
          alert('Bill was added');
          console.log(res);
          this.dialogRef.close(true);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  onSubmit() {
    console.log(this.bill);
    this.saveBill();
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
