import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../../services/apidata.service';
import { CommonModule, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CuttextPipe } from '../../services/cuttext.pipe';
import { RouterLink } from '@angular/router';
import { response } from 'express';
import { Category } from '../../Interface/category';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../search.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    CurrencyPipe,
    CuttextPipe,
    RouterLink,
    NgIf,
    CarouselModule,
    SearchPipe,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private _ApidataService: ApidataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  productData: any[] = [];
  categoryData: Category[] = [];
  termInput: string = '';

  ngOnInit(): void {
    this._ApidataService.getProducts().subscribe({
      next: (response) => {
        this.productData = response.data;
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._ApidataService.getCategories().subscribe({
      next: (response) => {
        console.log(response.data);
        this.categoryData = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000,
    navText: ['next', 'prev'],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };

  mainSlideOptions: OwlOptions = {
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
  // positionClass: 'toast-bottom-right';
  addProductCart(id: string): void {
    this._CartService.addToCartItem(id).subscribe({
      next: (response) => {
        console.log(response);
        this._CartService.cartNumber.next(response.numOfCartItems);
        // console.log(this._CartService.cartNumber);
        
        this._ToastrService.success(response.message, '', {closeButton: true, positionClass: 'toast-bottom-right'} );
      },
    });
  }
}
