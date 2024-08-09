import { Component, inject, OnInit} from '@angular/core';
import { MembersService } from '../../_servec/members.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Member } from '../../_INterFace/members';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem} from 'ng-gallery';
import Aos from 'aos';
@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [
    RouterLink,
    TabsModule,
    GalleryModule
  ],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss'
})
export class MemberDetailsComponent implements OnInit  {
   memberservec=inject(MembersService);
   routes=inject(ActivatedRoute)
   member:Member;
   imges:GalleryItem[]=[]
   ngOnInit(): void {
    this.loadmember()
    Aos.init()
   }
  loadmember(){
    const username=this.routes.snapshot.paramMap.get('username')
    if(!username) return;
    this.memberservec.getmember(username).subscribe({
     next:member=>{
       this.member=member,
       //galary
       member.photos.map((ph:any)=>{
        this.imges.push(new ImageItem({src:ph.url,thumb:ph.url}))
       })
     }
    })
  }
}
