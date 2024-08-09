import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ButhyService } from '../_servec/buthy.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
 const byseserves=inject(ButhyService)
 byseserves.busy()
  return next(req).pipe(
    delay(200),
    finalize(()=>{
      byseserves.idle()
    })
  )
};
