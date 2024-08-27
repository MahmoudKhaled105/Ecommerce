import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { response } from 'express';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _CartService:CartService) {}

  carId: any='';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.carId = params.get('id');
      },
    });
  }

  orderForm: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern(/^01[0125][0-9]{8}$/), Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  handelForm(): void {
    console.log(this.orderForm.value);
    const cartId = this.carId;
    const cartDetails=this.orderForm.value;

    this._CartService.checkOut(cartId, cartDetails).subscribe({
      next: (response) => {
        // console.log();
        window.open(response.session.url, '_self');
        // '_self' ==> make you go to payment in the same page
      },
    });
  }





}
