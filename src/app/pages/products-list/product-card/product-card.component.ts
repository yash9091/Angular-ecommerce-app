import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/products.models';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductDescriptionComponent } from "../../product-list/product-description/product-description.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ CommonModule,MatSnackBarModule, RouterLink, PrimaryButtonComponent],
  template: `
    <div
      class="bg-white  shadow-lg border rounded-lg border-gray-300  p-4 flex flex-col gap-4 relative transition-transform hover:scale-[1.02] hover:shadow-xl duration-300 relative h-[300px] max-h-[320px]"
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

      
      <app-primary-button
  [routerLink]="'/product/' + product().id"
  label="View Details"
  class="mt-3"
/>


<!-- Rating Display -->
<span
  class="absolute top-2 right-3 text-sm font-semibold"
[ngClass]="getRatingColor()"
>
  ⭐ {{ product().rating?.rate || 'No Rating' }}
</span>



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

  getRatingColor(): string {
  const rate = this.product().rating?.rate;
  if (rate === undefined) return 'text-gray-400';
  if (rate >= 4) return 'text-green-600';
  if (rate >= 2) return 'text-yellow-500';
  return 'text-red-500';
}

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
