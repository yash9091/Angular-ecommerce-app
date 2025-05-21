import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, OrderSummaryComponent, CommonModule, RouterLink],
  template: `
 <div class="p-6 max-w-4xl mx-auto">
  <h2 class="text-xl font-bold mb-6">Shopping Cart</h2>

  <!-- Show Empty Cart Message -->
  <div *ngIf="cartService.cart().length === 0" class="text-center py-10 text-gray-600">
    <p class="text-lg font-semibold mb-4">🛒 Your cart is empty</p>
    <button
      routerLink="/"
      class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
    >
      Continue Shopping
    </button>
  </div>

  <!-- Show Cart Items if not empty -->
  <div *ngIf="cartService.cart().length > 0" class="flex flex-col gap-4">
    <app-cart-item
      *ngFor="let item of cartService.cart()"
      [item]="item"
    ></app-cart-item>
  </div>

  <!-- Order Summary -->
  <div *ngIf="cartService.cart().length > 0" class="mt-8">
    <app-order-summary></app-order-summary>
  </div>
</div>

    
  `,
  styles: ``
})
export class CartComponent {
  cartService = inject(CartService);
  ngOnInit(){
    console.log(this.cartService)
  }
  

}
