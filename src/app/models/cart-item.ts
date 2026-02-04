import { Product } from "./models"; 

export interface CartItem {
  product: Product;
  quantity: number;
}
