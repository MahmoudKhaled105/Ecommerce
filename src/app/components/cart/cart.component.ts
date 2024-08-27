import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { response } from 'express';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}

  cartDetails: any = null;

  ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next: (response) => {
        console.log(response.data);
        this.cartDetails = response.data;
      },
    });
  }

  removeProduct(id: string, btnremove: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btnremove, 'disabled', 'true');
    this._CartService.removeCartItem(id).subscribe({
      next: (response) => {
        this._CartService.cartNumber.next(response.numOfCartItems)
        this.cartDetails = response.data;
        this._Renderer2.removeAttribute(btnremove, 'disabled');
      },
      error: (err) => {
        this._Renderer2.removeAttribute(btnremove, 'disabled');
      },
    });
  }

  changeCount(
    id: string,
    count: number,
    el1: HTMLButtonElement,
    el2: HTMLButtonElement
  ): void {
    if (count >= 1) {
      this._Renderer2.setAttribute(el1, 'disabled', 'true');
      this._Renderer2.setAttribute(el2, 'disabled', 'true');

      this._CartService.updateCount(id, count).subscribe({
        next: (response) => {
          console.log(response);
          this.cartDetails = response.data;
          this._Renderer2.removeAttribute(el1, 'disabled');
          this._Renderer2.removeAttribute(el2, 'disabled');
        },
        error: (err) => {
          this._Renderer2.removeAttribute(el1, 'disabled');
          this._Renderer2.removeAttribute(el2, 'disabled');
        },
      });
    }
  }
}
