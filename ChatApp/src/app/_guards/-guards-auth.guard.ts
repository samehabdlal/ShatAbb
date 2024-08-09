import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcountService } from '../_servec/acount.service';

export const authgard: CanActivateFn = (route, state) => {
  const servec=inject(AcountService);
  const toster = inject(ToastrService);
   if(servec.CurrentUser()){
    return true;
   }
   else{
    toster.error('You shall not pase !')
    return false
   }
};
