import { Component, computed, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { ProductsListComponent } from '../../pages/products-list/products-list.component';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ RouterLink, CommonModule],
  template: `
    <div
      class="bg-slate-100 px-4 py-3 shadow-md flex justify-between items-centre"
    >
      <div>
        <button class="text-xl" routerLink="/">Quick Store</button>
      </div>
      <div class="flex  justify-between gap-4">
        <a routerLink="/cart" class="relative">
  <i class="fas fa-shopping-cart text-2xl text-blue-600"></i>
  <span
    *ngIf="cartService.cart().length > 0"
    class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
  >
    {{ cartService.cart().length }}
  </span>
</a>
        <div>
          <a  class=" text-lg" routerLink="/contact">Contact Us</a>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class HeaderComponent {
  cartService = inject(CartService);
  // cartLabel = computed(() => `Cart (${this.cartService.cart().length})`);
}
