import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

//if you want to make change on property that affect from component to another use behavior subject.
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0) ;

  // MyToken: any = {
  //   token: localStorage.getItem('_token'),
  // };


  

  addToCartItem(prodID: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: prodID,
      },
      // {
      //   headers: this.MyToken,
      // }
    );
  }

  getCartUser():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, 
      // {
      //   headers: this.MyToken
      // }
    );
  }

  removeCartItem(prodID:string):Observable<any>{
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${prodID}`,
      // {
      //   headers: this.MyToken
      // }
    );
  }

   updateCount(id:string, countNum:number):Observable<any>{
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: countNum,
      },
      // {
      //   headers: this.MyToken,
      // }
    );
   }

   checkOut(cart_id:string, orderDetails:object):Observable<any>{
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart_id}?url=http://localhost:4200`,
      {
        shippingAddress: orderDetails
      },
      // {
      //   headers:this.MyToken
      // }
    );
   }

   getAllOrder():Observable<any>{
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/`
    );
   }
   
   removeUserCarts():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`, 
      // {
      // headers: this.MyToken
    // }
  )
   }
}


