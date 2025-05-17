import { Component, computed, signal } from '@angular/core';
import { Product } from '../../models/products.models';
import { ProductCardComponent } from './product-card/product-card.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, MatInputModule, FormsModule],
  template: `
    <div class="p-4 max-w-6xl mx-auto">
      <!-- Search Input -->
      <div class="relative w-full mb-6 ">
  <input
    type="text"
   [ngModel]="searchTerm()"
        (ngModelChange)="searchTerm.set($event)"
    placeholder="Search for products..."
  class="w-[50%] pl-10 pr-4 py-2 rounded-lg border border-gray-300 
         focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white 
         text-gray-800 placeholder-gray-400 shadow-sm transition duration-150 
         ease-in-out hover:shadow-md"
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z"
    />
  </svg>
</div>


      <!-- Loading Spinner -->
      @if (loading()) {
        <div class="flex justify-center items-center h-[60vh]">
          <div
            class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
      } @else {

        <!-- No products found -->
        @if (filteredProducts().length === 0) {
          <div class="text-center text-gray-500 text-lg">
            No products match your search.
          </div>
        } @else {

          <!-- Products Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-[50px]">
            @for (product of filteredProducts(); track product.id) {
              <app-product-card [product]="product" />
            }
          </div>

        }
      }
    </div>
  `,
   styles: [`
    ::ng-deep .custom-search .mat-form-field-outline {
      border-radius: 12px;
    }

    ::ng-deep .custom-search .mat-form-field-flex {
      background-color: #f9fafb;
      padding-left: 12px;
      padding-right: 12px;
      border-radius: 12px;
    }

    .custom-search-input {
      padding-left: 8px !important;
      font-size: 15px;
      font-weight: 500;
    }
  `],
})
export class ProductsListComponent {
  loading = signal(true);
  products = signal<Product[]>([]);
  searchTerm = signal('');

  filteredProducts = computed(() =>
    this.products().filter((p) =>
      p.title.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  async ngOnInit() {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    this.products.set(data);
    this.loading.set(false);
  }
}
