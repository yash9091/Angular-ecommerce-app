import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/products.models';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductDescriptionComponent } from "../../product-list/product-description/product-description.component";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatSnackBarModule, RouterLink, PrimaryButtonComponent],
  template: `
    <div
      class="bg-white  shadow-lg border border-gray-200 rounded-2xl p-4 flex flex-col gap-4 relative transition-transform hover:scale-[1.02] hover:shadow-xl duration-300 relative h-[300px] max-h-[320px]"
      tabindex="-1"
    >
      <!-- Product Image -->
      <div class="flex justify-center items-center h-[150px]">
        <img
          [src]="product().image"
          class="w-[120px] h-[120px] object-contain"
          alt="Product Image"
          loading="lazy"
        />
      </div>

      <!-- Product Title and Price -->
      <div class="flex flex-col gap-1 px-1">
        <span class="text-base font-semibold line-clamp-2 leading-snug text-gray-800 ">
          {{ product().title }}
        </span>
        <span class="text-sm font-medium text-gray-600">
          {{ '$' + product().price }}
        </span>
      </div>

      <!-- Add to Cart Button -->

      <!-- <app-primary-button
        (btnClicked)="onAddToCartClick()"
        class="mt-2"
        label="Add to Cart"
      /> -->
      
      <app-primary-button
  [routerLink]="'/product/' + product().id"
  label="View Details"
  class="mt-3"
/>


      <!-- Stock Indicator -->
      <span
        class="absolute top-2 right-3 text-sm font-semibold"
        [class]="product().stock ? 'text-green-600' : 'text-red-500'"
      >
        @if (product().stock) {
          {{ product().stock }} left
        } @else {
          Out of stock
        }
      </span>
    </div>
  `,
  styles: [`
    /* Optional: Truncate title nicely */
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ProductCardComponent {
  cartService = inject(CartService);
  product = input.required<Product>();
  snackBar = inject(MatSnackBar);

  onAddToCartClick() {
    const item = this.product();
    this.cartService.addToCart(item); 
    this.snackBar.open('🛒 Added to cart!', 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['bg-blue-500', 'text-white']
    });
  }
}
