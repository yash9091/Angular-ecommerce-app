import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.models';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<CartItem[]>(this.loadCartFromStorage());

  constructor() {}

  addToCart(product: Product) {
    const existingItem = this.cart().find(item => item.id === product.id);

    let updatedCart: CartItem[];

    if (existingItem) {
      updatedCart = this.cart().map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...this.cart(), { ...product, quantity: 1 }];
    }

    this.cart.set(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  removeFromCart(id: number) {
    const updatedCart = this.cart().filter(item => item.id !== id);
    this.cart.set(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  updateQuantity(id: number, quantity: number) {
    if (quantity < 1) {
      this.removeFromCart(id);
      return;
    }

    const updatedCart = this.cart().map(item =>
      item.id === id ? { ...item, quantity } : item
    );

    this.cart.set(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  getTotalPrice(): number {
    return this.cart().reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cart.set([]);
    localStorage.removeItem('cart');
  }

  private saveCartToStorage(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private loadCartFromStorage(): CartItem[] {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }
}
