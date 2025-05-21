import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './order-summary.component.html',
  styles: ``,
})
export class OrderSummaryComponent {
  cartService = inject(CartService);

  deliveryCharges = 10;
  discount = 20;

  subtotal = computed(() =>
    this.cartService.cart().reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
  );

  totalItems = computed(() =>
    this.cartService.cart().reduce((acc, item) => acc + (item.quantity || 1), 0)
  );

  totalPayable = computed(() =>
    Math.max(this.subtotal() - this.discount + this.deliveryCharges, 0)
  );
}
