import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-product-description',
  imports: [CommonModule, PrimaryButtonComponent, MatSnackBarModule],
  template: `
    <div  class="max-w-4xl mx-auto mt-10 p-6 shadow-md bg-white rounded-xl">
      <div class="flex gap-6">
        <img [src]="product.image" class="w-64 h-64 object-contain" />
        <div class="flex-1 flex flex-col gap-4">
          <h1 class="text-2xl font-bold">{{ product.title }}</h1>
          <p class="text-gray-700">{{ product.description }}</p>
          <span class="text-lg font-semibold text-blue-600">{{ '$' + product.price }}</span>
          <app-primary-button label="Add to Cart" 
                  (btnClicked)="onAddToCartClick()"         
           />
        </div>
      </div>
    </div>
  `,
})
export class ProductDescriptionComponent {
  route = inject(ActivatedRoute);
  cartService = inject(CartService);
  snackBar = inject(MatSnackBar);
  product: any;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    this.product = await res.json();
  }

 onAddToCartClick() {
  const item = this.product; // ✅ access as property, not a function
  this.cartService.addToCart(item); 
  this.snackBar.open('🛒 Added to cart!', 'Close', {
    duration: 1000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['bg-blue-500', 'text-white']
  });
}

}
