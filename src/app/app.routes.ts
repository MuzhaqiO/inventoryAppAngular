import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'category', loadComponent: () => import('./category/category.component').then(mod => mod.CategoryComponent)},
    {path: 'add-category', loadComponent: () => import('./add-category/add-category.component').then(mod => mod.AddCategoryComponent)},
    {path: 'product', loadComponent: () => import('./product/product.component').then(mod => mod.ProductComponent)},
    {path: 'bill', loadComponent: () => import('./bill/bill.component').then(mod => mod.BillComponent)},
    {path: 'warehouse', loadComponent: () => import('./warehouse/warehouse.component').then(mod => mod.WarehouseComponent)},
];
