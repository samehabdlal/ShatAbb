import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../_INterFace/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcountService {
  constructor() { }
  http=inject(HttpClient)
  basurl=environment.apiusrl
  CurrentUser=signal<User | null>(null);
  login(model:any):Observable<any>{
    return this.http.post<User>( this.basurl+`Account/login`,model).pipe(
      map(user=>{
        if(user){
          this.Setcurentuser(user)
        }
      })
    )
  }
  // regstier cmponinte
  register(model:any):Observable<any>{
    return this.http.post<User>( this.basurl+`Account/register`,model).pipe(
      map(user=>{
        if(user){
          this.Setcurentuser(user)
        }
      return user
      })
    )
  }
  Setcurentuser(user:User){
    localStorage.setItem("user",JSON.stringify(user));
    this.CurrentUser.set(user)
  }

  //logout users
  logout(){
    localStorage.removeItem('user');
    this.CurrentUser.set(null)
  }
  //logout users

}
