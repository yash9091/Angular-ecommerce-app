import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.models';
import { ButtonComponent } from "../../../components/button/button.component";
import { CartService } from '../../../services/cart.service';
import { OrderSummaryComponent } from "../order-summary/order-summary.component";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 hover:shadow-lg transition-shadow duration-200">
  
  <!-- Product Info -->
  <div class="flex gap-4 items-center flex-1">
    <img [src]="item().image" class="w-20 h-20 object-contain rounded-md border" alt="Product Image" />
    <div>
      <h3 class="text-lg font-semibold text-gray-800">{{ item().title }}</h3>
      <p class="text-gray-600 text-sm">Price: ₹{{ item().price }}</p>
    </div>
  </div>

  <!-- Quantity Control -->
  <div class="flex items-center gap-2">
    <button
      (click)="decreaseQuantity()"
      class="w-8 h-8 rounded bg-gray-100 text-xl font-bold hover:bg-gray-200"
    >−</button>
    <span class="font-semibold">{{ item().quantity }}</span>
    <button
      (click)="increaseQuantity()"
      class="w-8 h-8 rounded bg-gray-100 text-xl font-bold hover:bg-gray-200"
    >+</button>
  </div>

  <!-- Price & Remove -->
  <div class="flex flex-col items-end gap-2">
    <div class="font-semibold text-gray-700 text-md">₹{{ item().price * item().quantity }}</div>
    <button
      (click)="cartService.removeFromCart(item().id)"
      class="text-red-500 hover:text-red-600 text-sm"
    >Remove</button>
  </div>
</div>


    
  `,
  styles: ``,
})
export class CartItemComponent {
  cartService = inject(CartService);
  item = input.required<Product>();

   increaseQuantity() {
    this.cartService.updateQuantity(this.item().id, this.item().quantity + 1);
  }

  decreaseQuantity() {
    if (this.item().quantity > 1) {
      this.cartService.updateQuantity(this.item().id, this.item().quantity - 1);
    } else {
      this.cartService.removeFromCart(this.item().id);
    }
  }
}
