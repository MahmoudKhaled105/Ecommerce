import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ProductsResolverService } from '../services/products-resolver.service';
import { delay, finalize, pipe } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(ProductsResolverService);
  busyService.busy();
  return next(req).pipe(
    delay(2000),
    finalize(()=> busyService.idle())
  )
};
