import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_INterFace/members';
import { Observable, of, tap } from 'rxjs';
import { Photo } from '../_INterFace/photo';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  httpclinet = inject(HttpClient);
  basurl = environment.apiusrl;
  members = signal<Member[]>([]);
  //get all members
  getmembers() {
    return this.httpclinet.get<Member[]>(this.basurl + 'users').subscribe({
      next: (member) => {
        this.members.set(member);
      },
    });
  }
  //get members is usernem
  getmember(username: string) {
    const member = this.members().find((x) => x.userName === username);
    if (member !== undefined) return of(member);
    return this.httpclinet.get<Member>(this.basurl + 'users/' + username);
  }
  //update members is details
  Updatemember(member: Member):Observable<any> {
    return this.httpclinet.put(this.basurl + 'users', member).pipe(
      tap(() => {
        this.members.update((members) =>
          members.map((M) => member.userName === M.userName ? member : M)
        )
      })
    );
  }
  // update photos 
  setmainphoto(photos:Photo):Observable<any>{
     return this.httpclinet.put(this.basurl+'Users/set-main-photo/'+photos.id,{})
     //?handel
     .pipe(
      tap(()=>{
        this.members.update(member=>member.map(m=>{
          if(m.photos.includes(photos)){
             m.photoUrl=photos.url
          }
          return m
        }))
      })
     )
  }
  // delet photos 
     Deletphoto(photo:Photo):Observable<any>{
     return this.httpclinet.delete(this.basurl+'Users/delete-photo/'+photo.id).pipe(
      tap(_=>{
          this.members.update(m=>m.map(m=>{
            if(m.photos.includes(photo)){
              m.photos=m.photos.filter(x=>x.id!==photo.id)
            }
            return m
          }))
      })
     )
     }
  //end delet photos 
}

