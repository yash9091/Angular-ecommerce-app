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

      <div class="flex flex-col sm:flex-row gap-4 mb-6 items-center">
       <!-- Price Filter -->
<label class="flex items-center gap-2">
  Price Range:
  <select
    [ngModel]="selectedPriceRange()"
    (ngModelChange)="selectedPriceRange.set($event)"
    class="border px-3 py-1 rounded"
  >
    <option value="all">All</option>
    <option value="under25">Under $25</option>
    <option value="25to50">$25 - $50</option>
    <option value="50to100">$50 - $100</option>
    <option value="above100">Above $100</option>
  </select>
</label>


        <!-- Rating Filter -->
        <label class="flex items-center gap-2">
          Rating:
          <select
            [ngModel]="ratingFilter()"
            (ngModelChange)="ratingFilter.set(+$event)"
            class="border px-3 py-1 rounded"
          >
            <option [value]="0">Any</option>
            <option [value]="1">1+</option>
            <option [value]="2">2+</option>
            <option [value]="3">3+</option>
            <option [value]="4">4+</option>
          </select>
        </label>
         <button
    (click)="clearFilters()"
    class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow-sm transition"
  >
    Clear Filters
  </button>
      </div>

      <!-- Products Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-[50px]"
      >
        @for (product of filteredProducts(); track product.id) {
        <app-product-card [product]="product" />
        }
      </div>

      } }
    </div>
  `,
  styles: [
    `
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
    `,
  ],
})
export class ProductsListComponent {
  loading = signal(true);
  products = signal<Product[]>([]);
  searchTerm = signal('');
selectedPriceRange = signal<string>('all');
  ratingFilter = signal<number>(0); // Min rating

 filteredProducts = computed(() =>
  this.products().filter((p) => {
    const matchesTitle = p.title
      .toLowerCase()
      .includes(this.searchTerm().toLowerCase());

    const matchesRating = (p.rating?.rate || 0) >= this.ratingFilter();

    let matchesPrice = true;
    const price = p.price;
    const selectedRange = this.selectedPriceRange();

    if (selectedRange === 'under25') {
      matchesPrice = price < 25;
    } else if (selectedRange === '25to50') {
      matchesPrice = price >= 25 && price <= 50;
    } else if (selectedRange === '50to100') {
      matchesPrice = price > 50 && price <= 100;
    } else if (selectedRange === 'above100') {
      matchesPrice = price > 100;
    }

    return matchesTitle && matchesPrice && matchesRating;
  })
);

clearFilters() {
  this.searchTerm.set('');
  this.selectedPriceRange.set('all');
  this.ratingFilter.set(0);
}



  async ngOnInit() {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    this.products.set(data);
    this.loading.set(false);
    console.log('data', data);
  }
}
