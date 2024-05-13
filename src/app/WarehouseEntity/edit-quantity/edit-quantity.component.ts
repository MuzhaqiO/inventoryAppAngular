import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Warehouse } from '../warehouse/warehouse';
import { WarehouseService } from '../warehouse/warehouse.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-quantity',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatInputModule, CommonModule],
  templateUrl: './edit-quantity.component.html',
  styleUrl: './edit-quantity.component.css'
})
export class EditQuantityComponent {

  warehouse: Warehouse = {
    productId: 0,
    name:'',
    quantity:0
  };

  constructor(private warehouseService: WarehouseService, private dialogRef: MatDialogRef<EditQuantityComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(){
    if (this.data){
      this.warehouse = this.data
    }
  }
  saveWarehouse(){
    this.warehouseService.updateWarehouse(this.data.productId, this.warehouse.quantity).subscribe(
      {
        next: (res: Warehouse) => {
          alert('Warehouse was updated');
          console.log(res);
          this.dialogRef.close(true);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  onSubmit(){
    console.log(this.warehouse);
    this.saveWarehouse();
  }

  closeDialog(){
    this.dialogRef.close(false);
  }
}
