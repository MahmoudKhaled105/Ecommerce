import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService {
busyRequest = 0;
  constructor(private spinerService: NgxSpinnerService) { }
  busy(){
    this.busyRequest++;
    this.spinerService;
    this.spinerService.show(undefined, {
      type: 'ball-scale-ripple',
      bdColor:'rgba(0,0,0,0.8)',
      color:'#ffff',
      size:'default'
    });
    
  }

  idle(){
    this.busyRequest--;
    if(this.busyRequest <= 0){
      this.busyRequest =0 ;
      this.spinerService.hide();
    }
  }
}
