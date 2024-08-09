import {  Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButhyService {
  vewspiiner=signal<boolean>(false)
busy(){
this.vewspiiner.set(true)
}
idle(){
this.vewspiiner.set(false)
}
}
