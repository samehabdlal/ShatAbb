import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: 'test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
  baseUrl=environment.apiusrl
 private http=inject(HttpClient);
 public valdtionError:string[]=[];
   get400Error(){
    this.http.get( this.baseUrl+`buggy/bad-request`).subscribe({
      next:response=>{console.log(response)},
      error:error=>{console.log(error);
      }
    })
   }
   get401Error(){
    this.http.get(this.baseUrl+ 'buggy/auth').subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
   }
   get404Error(){
    this.http.get(this.baseUrl+ 'buggy/not-found').subscribe({
      next:response=>{console.log(response)},
      error:error=>{console.log(error);
      }
    })
   }
   get500Error(){
    this.http.get(this.baseUrl+ 'buggy/server-error').subscribe({
      next:response=>{console.log(response)},
      error:error=>{console.log(error);
      }
    })
   }
   get404valditionError(){
    this.http.post(this.baseUrl+ 'account/regster',{}).subscribe({
      next:response=>{console.log(response)},
      error:error=>{console.log(error);
        this.valdtionError=error
      }
    })
   }
}
