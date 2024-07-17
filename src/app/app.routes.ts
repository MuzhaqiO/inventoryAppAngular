import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'category', loadComponent: () => import('./CategoryEntity/category/category.component').then(mod => mod.CategoryComponent)},
    {path: 'add-category', loadComponent: () => import('./CategoryEntity/add-category/add-category.component').then(mod => mod.AddCategoryComponent)},
    {path: 'product', loadComponent: () => import('./ProductEntity/product/product.component').then(mod => mod.ProductComponent)},
    {path: 'add-product', loadComponent: () => import('./ProductEntity/add-product/add-product.component').then(mod => mod.AddProductComponent)},
    {path: 'bill', loadComponent: () => import('./BillEntity/bill/bill.component').then(mod => mod.BillComponent)},
    {path: 'bill/:id', loadComponent: () => import('./BillEntity/full-bill/full-bill.component').then(mod => mod.FullBillComponent)},
    {path: 'add-bill', loadComponent: () => import('./BillEntity/add-bill/add-bill.component').then(mod => mod.AddBillComponent)},
    {path: 'transaction', loadComponent: () => import('./TransactionEntity/transaction/transaction.component').then(mod => mod.TransactionComponent)},
    {path: 'add-transaction', loadComponent: () => import('./TransactionEntity/add-transaction/add-transaction.component').then(mod => mod.AddTransactionComponent)},
    {path: 'warehouse', loadComponent: () => import('./WarehouseEntity/warehouse/warehouse.component').then(mod => mod.WarehouseComponent)},
    {path: 'edit-warehouse', loadComponent: () => import('./WarehouseEntity/edit-quantity/edit-quantity.component').then(mod => mod.EditQuantityComponent)}
];
