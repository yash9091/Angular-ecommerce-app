import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 class="text-2xl font-bold mb-4">Checkout</h2>

      <form (ngSubmit)="placeOrder()" #checkoutForm="ngForm">
        <div class="mb-4">
          <label class="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            class="w-full border px-4 py-2 rounded"
            required
            [(ngModel)]="name"
            name="name"
          />
        </div>

        <div class="mb-4">
          <label class="block font-semibold mb-1">Address</label>
          <textarea
            class="w-full border px-4 py-2 rounded"
            required
            [(ngModel)]="address"
            name="address"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="block font-semibold mb-1">Payment Method</label>
          <select
            class="w-full border px-4 py-2 rounded"
            required
            [(ngModel)]="paymentMethod"
            name="paymentMethod"
          >
            <option value="" disabled selected>Select Payment</option>
            <option>Credit Card</option>
            <option>UPI</option>
            <option>Cash on Delivery</option>
          </select>
        </div>

        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>

      <div *ngIf="orderPlaced()" class="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
        <h3 class="text-xl font-semibold mb-2">🎉 Order Placed Successfully!</h3>
        <p><strong>Name:</strong> {{ name }}</p>
        <p><strong>Address:</strong> {{ address }}</p>
        <p><strong>Payment:</strong> {{ paymentMethod }}</p>
      </div>
    </div>
  `,
})
export class CheckoutComponent {
  name = '';
  address = '';
  paymentMethod = '';
  orderPlaced = signal(false);

  placeOrder() {
    this.orderPlaced.set(true);
  }
}
