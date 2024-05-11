import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'category', loadComponent: () => import('./CategoryEntity/category/category.component').then(mod => mod.CategoryComponent)},
    {path: 'add-category', loadComponent: () => import('./CategoryEntity/add-category/add-category.component').then(mod => mod.AddCategoryComponent)},
    {path: 'product', loadComponent: () => import('./ProductEntity/product/product.component').then(mod => mod.ProductComponent)},
    {path: 'bill', loadComponent: () => import('./BillEntity/bill/bill.component').then(mod => mod.BillComponent)},
    {path: 'warehouse', loadComponent: () => import('./WarehouseEntity/warehouse/warehouse.component').then(mod => mod.WarehouseComponent)},
];
