import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bill } from '../bill/bill';
import { BillService } from '../bill/bill.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from '../../navbar/navbar.component';
import { TransactionComponent } from '../../TransactionEntity/transaction/transaction.component';
import { Type } from '../bill/type';

@Component({
  selector: 'app-full-bill',
  standalone: true,
  imports: [NavbarComponent, MatIconModule, MatTableModule, CommonModule, TransactionComponent],
  templateUrl: './full-bill.component.html',
  styleUrl: './full-bill.component.css'
})
export class FullBillComponent {
  billId!: number;
  dataSource: Bill = {
    id: 0,
    date: new Date(),
    type: Type.BUY,
    transactions: [],
    totalValue: 0
  };
  displayedColumns: string[] = ['id', 'productId', 'quantity', 'finalValue'];

  constructor(private route: ActivatedRoute, private billService: BillService){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.billId = +params['id'];
    });
    this.getBillById(this.billId);
  }

  getBillById(billId: number) {
    this.billService.getBillById(billId).subscribe(
      {
        next: (res: Bill) => {
          this.dataSource =res;
          console.log(res);
        },
        error: (err: Bill) => {
          console.log(err);
        }
      }
    );
  }
}
