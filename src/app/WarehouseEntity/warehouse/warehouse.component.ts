import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Warehouse } from './warehouse';
import { WarehouseService } from './warehouse.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditQuantityComponent } from '../edit-quantity/edit-quantity.component';


@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [NavbarComponent, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent {
  dataSource: Warehouse[] = [];
  displayedColumns: string[] = ['productId', 'name', 'quantity', 'actions'];

  constructor(private warehouseService: WarehouseService, private _dialog: MatDialog){}

  openEditWarehouseDialog(data: any){
    const dialogRef = this._dialog.open(EditQuantityComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getWarehouseList();
        }
      }
    });
  }
  ngOnInit(): void {
    this.getWarehouseList();
  }
  getWarehouseList(): void {
    this.warehouseService.getWarehouses().subscribe(
      {
        next: (res: Warehouse[]) => {
          this.dataSource = res;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }
}
