import { CartItem } from "./CartItem.model";

export interface Cart {
    userId: string; // Unique identifier for the user who owns the cart
    items: CartItem[]; // Array of CartItem objects representing the products in the cart
    // Additional properties, such as cart total, can be added here
  }