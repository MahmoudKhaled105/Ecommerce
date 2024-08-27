import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApidataService } from '../../services/apidata.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-detailsproduct',
  standalone: true,
  imports: [CurrencyPipe, NgIf, CarouselModule, NgFor, RouterLink],
  templateUrl: './detailsproduct.component.html',
  styleUrl: './detailsproduct.component.scss',
})
export class DetailsproductComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ApidataService: ApidataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  productDetails: any = null;
  productId: string | null = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
      },
    });

    this._ApidataService.getProductsById(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.data;
      },
    });
  }

  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000,
    navText: ['next', 'prev'],
    items: 1,
    nav: false,
  };

  addProductCart(id: string): void {
    this._CartService.addToCartItem(id).subscribe({
      next: (response) => {
        this._CartService.cartNumber.next(response.numOfCartItems)
        this._ToastrService.success(response.message, '', {
          positionClass: 'toast-bottom-right',
        });
      },
    });
  }
}
