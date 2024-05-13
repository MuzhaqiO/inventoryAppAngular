import { Category } from "../../CategoryEntity/category/category";

export interface Product {
    id: number,
    name: string,
    price: number,
    categories: Category[]
}