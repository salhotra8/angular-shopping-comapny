export interface Product{
    id?: string;
    productName: string;
    price:string;
    category:string;
    subCategory:string;
    imageUrl: string;
    quantity? : number;
}