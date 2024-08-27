import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { response } from 'express';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService: CartService) {}

  ngOnInit(): void {
    this._CartService.getAllOrder().subscribe({
      next:(response)=>{
        console.log(response);
      }
    });

    this._CartService.removeUserCarts().subscribe({
      next:(response)=>{
        console.log(response);
        
      }
    })
  }

}
