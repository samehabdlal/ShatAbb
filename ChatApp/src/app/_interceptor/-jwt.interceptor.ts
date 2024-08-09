import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AcountService } from '../_servec/acount.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const AcountServec=inject(AcountService);
  if(AcountServec.CurrentUser()){
    req=req.clone({
      setHeaders:{
        Authorization:`Bearer ${AcountServec.CurrentUser()?.token}`
      }
    })
  }
  return next(req);
};
