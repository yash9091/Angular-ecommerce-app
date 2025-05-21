import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { Component } from '@angular/core';
import { ProductDescriptionComponent } from './pages/product-list/product-description/product-description.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductsListComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'product/:id',
    component: ProductDescriptionComponent,
  },
  {
    path: 'contact',
    component: ContactUsComponent,
  },
  { path: 'checkout', component: CheckoutComponent },
];
