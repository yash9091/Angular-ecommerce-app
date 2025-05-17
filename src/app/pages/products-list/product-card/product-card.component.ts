import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.models';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `
<div
      class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative"
    >
      <div class="mx-auto">
        <img
          [src]="product().image"
          class="w-[200px] h-[100px] object-contain"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-md font-bold">{{ product().title }}</span>
        <span class="text-sm"> {{ '$' + product().price }}</span>
        <app-primary-button
          (btnClicked)="onAddToCartClick()"

          class="mt-3"
          label="Add to Cart"
        />
      </div>

      <span
        class="absolute top-2 right-3 text-sm font-bold"
        [class]="product().stock ? 'text-green-500' : 'text-red-500'"
      >
        @if (product().stock) {
        {{ product().stock }} left } @else { Out of stock }
      </span>
    </div>  `,
  styles: ``
})
export class ProductCardComponent {
    cartService = inject(CartService);

  product =  input.required<Product>();

  onAddToCartClick() {
    const item = this.product();
    console.log('Clicked Add to Cart with:', item);
    this.cartService.addToCart(item);
  }

}
 