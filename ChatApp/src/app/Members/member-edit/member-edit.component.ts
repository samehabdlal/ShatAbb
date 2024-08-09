import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_INterFace/members';
import { AcountService } from '../../_servec/acount.service';
import { MembersService } from '../../_servec/members.service';
import { RouterLink } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Aos from 'aos';
import { EditPhotoComponent } from "../edit-photo/edit-photo.component";
@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [
    RouterLink,
    TabsModule,
    FormsModule,
    EditPhotoComponent
],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit{
  member:Member;
ecountserves=inject(AcountService);
memebersserves=inject(MembersService);
toster=inject(ToastrService);
@ViewChild('editform') editform:NgForm;
@HostListener('window:beforeunload',[`$event`]) notify($event:any) {
      if(this.editform.dirty){
        $event.returnValue=true
      }
} 
ngOnInit(): void {
 this.LoadMembrs()
 Aos.init()
}
LoadMembrs(){
  const user=this.ecountserves.CurrentUser();
  if(!user) return
  else{
       this.memebersserves.getmember(user.username).subscribe({
        next:members=>{this.member=members
        }
       })
  }
}

Oneditform(editform:NgForm){
  this.memebersserves.Updatemember(editform.value).subscribe({
    complete:()=>this.toster.success('profile update successfully')
  })
editform.reset(this.member);
}
OnmemberChange(event:any){
  this.member=event
}
}
