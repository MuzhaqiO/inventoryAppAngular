import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Bill } from './bill';
import { BillService } from './bill.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddBillComponent } from '../add-bill/add-bill.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [NavbarComponent, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent {

  dataSource: Bill[] = [];
  displayedColumns: string[] = ['id', 'date', 'type', 'category', 'totalValue'];

  constructor(private billService: BillService, private _dialog: MatDialog, private router: Router){}

  openAddBillDialog(){
    const dialogRef = this._dialog.open(AddBillComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBillList();
        }
      }
    })
  }

  ngOnInit(): void {
    this.getBillList();
  }

  getBillList(): void {
    this.billService.getBills().subscribe({
      next: (res: Bill[]) => {
        this.dataSource =res;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  navigateToBill(billId: number) {
    this.router.navigate(['/bill', billId]);
  }
}
