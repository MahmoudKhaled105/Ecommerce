import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoadingBarModule, LoadingBarService } from '@ngx-loading-bar/core';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-navbar-blnak',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LoadingBarModule],
  templateUrl: './navbar-blnak.component.html',
  styleUrl: './navbar-blnak.component.scss',
})
export class NavbarBlnakComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}

  cartCount: number = 0;

  @ViewChild('navBar') navElement!: ElementRef;

  @HostListener('window:scroll')
  onScroll() {
    if (window.scrollY > 400) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-5');
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5');
    }
  }

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartCount = data;
      },
    });

    this._CartService.getCartUser().subscribe({
      next: (response) => {
        console.log(response);
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
    });
  }

  // ngAfterViewInit(): void {
  //   this._Renderer2.addClass(this.navElement.nativeElement , 'px-5')

  // }

  signout(): void {
    localStorage.removeItem('_token');
    this._Router.navigate(['/login']);
  }
}
