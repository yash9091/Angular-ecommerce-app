import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.models';
import { ButtonComponent } from "../../../components/button/button.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="bg-white shadow-lg border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-xl transition-shadow duration-200">
      
      <!-- Product Info -->
      <div class="flex gap-4 items-center flex-1">
        <img [src]="item().image" class="w-20 h-20 object-contain rounded-md border" alt="Product Image" />
        <div class="flex flex-col gap-1">
          <h3 class="text-lg font-semibold text-gray-800">{{ item().title }}</h3>
          <p class="text-blue-600 font-bold text-md">{{ '$' + item().price }}</p>
        </div>
      </div>

      <!-- Remove Button -->
      <div class="flex justify-end sm:justify-center">
        <app-button 
          label="Remove" 
          class="hover:bg-red-400 text-white font-semibold py-2 px-4 rounded"
          (btnClicked)="cartService.removeFromCart(item().id)"
        />
      </div>
    </div>
  `,
  styles: ``,
})
export class CartItemComponent {
  cartService = inject(CartService);
  item = input.required<Product>();
}
