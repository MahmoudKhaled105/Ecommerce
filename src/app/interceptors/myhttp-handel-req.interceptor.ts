import { Token } from '@angular/compiler';
import { HttpInterceptorFn } from '@angular/common/http';

export const myhttpHandelReqInterceptor: HttpInterceptorFn = (req, next) => {
  
  if(localStorage.getItem('_token') != null){
    const Mytoken: any = localStorage.getItem('_token');
    req = req.clone({
      setHeaders:{
        token: Mytoken
      }
    })        //return copy req
  }

  return next(req);
};
