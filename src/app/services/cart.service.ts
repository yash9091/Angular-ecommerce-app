import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<Product[]>(this.loadCartFromStorage());

  constructor() {}

  addToCart(product: Product) {
    const updatedCart = [...this.cart(), product];
    this.cart.set(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  removeFromCart(id: number) {
    const updatedCart = this.cart().filter((p) => p.id !== id);
    this.cart.set(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  private saveCartToStorage(cart: Product[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private loadCartFromStorage(): Product[] {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }
}
