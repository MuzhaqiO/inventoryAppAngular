import { Category } from "../../CategoryEntity/category/category";
import { Transaction } from "../../TransactionEntity/transaction/transaction";
import { Type } from "./type";

export interface Bill {
    id: number;
    date: Date;
    type: Type;
    transactions: Transaction[];
    category: Category;
    totalValue: number;
}