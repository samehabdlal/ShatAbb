import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const interceptorsInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toster = inject(ToastrService);
  return next(req).pipe(
    catchError((error)=>{
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelstatueserror = [];
              for (const key in error.errors.error) {
                if (error.error.errors[key]) {
                  modelstatueserror.push(error.error.errors[key]);
                  toster.error(error.error.errors)
                }
              }
              throw modelstatueserror.flat();
            } else {
              toster.error(error.error, error.status);
            }
            break;
          case 401:
            toster.error('UnAuthorised', error.status);
            break;
          case 404:
            router.navigate(['/not-found']);
            break;
          case 500:
            const navgationExtraioes: NavigationExtras = {
              state: { error: error.error },
            };
            router.navigateByUrl('/server-error', navgationExtraioes);
            break;
          default:
            toster.error('something unexpected went wrong');
            break;
        }
      }
      throw error;
    })
  );
};
