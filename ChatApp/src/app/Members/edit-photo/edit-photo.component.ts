import { Component,  ElementRef,  EventEmitter,  inject,  Input,  input, NgModule, numberAttribute, OnInit, output, Pipe, ViewChild } from '@angular/core';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AcountService } from '../../_servec/acount.service';
import { Member } from '../../_INterFace/members';
import { FormsModule} from '@angular/forms';
import { Photo } from '../../_INterFace/photo';
import { MembersService } from '../../_servec/members.service';
@Component({
  selector: 'app-edit-photo',
  standalone: true,
  imports: [
    NgFor,
    NgStyle,
    NgIf,
    NgClass,
    FileUploadModule,
   DecimalPipe,
  FormsModule
  ],
  templateUrl: './edit-photo.component.html',
  styleUrl: './edit-photo.component.scss'
})
export class EditPhotoComponent implements OnInit {
  ngOnInit(): void {
    this.initializeuploader()
  }

  fileuploader:FileUploader
  member=input.required<Member>();
  acountservice=inject(AcountService) 
   memberservice=inject(MembersService)

  hasBaseDropZoneOver=false
  uploader:FileUploader
  basurl=environment.apiusrl;
  memberchange=output<Member>()
  fileOverBase(e:any){
    this.hasBaseDropZoneOver=e
  }
///updat photo is localstorge and backend
  setmainphoto(photo:Photo){
      this.memberservice.setmainphoto(photo).subscribe({
        next:data=>{
         const user= this.acountservice.CurrentUser()
         if(user){
           user.photoUrl=photo.url
           this.acountservice.Setcurentuser(user)
         }
         const updatedmember={...this.member()}
         updatedmember.photoUrl=photo.url;
         updatedmember.photos.forEach(data=>{
          if(data.isMain) data.isMain=false;
          if(data.id==photo.id) data.isMain=true;
          this.memberchange.emit(updatedmember)
         })
        }
      })
  } 
///updat photo is localstorge and backend
///delet photo is localstorge and backend
deletphoto(photo:Photo){
  this.memberservice.Deletphoto(photo).subscribe({
    next:_=>{
      const updatedmember={...this.member()}
      updatedmember.photos=updatedmember.photos.filter(x=>x.id!==photo.id)
      this.memberchange.emit(updatedmember)
    }
  })
}
///delet photo is localstorge and backend

  initializeuploader(){
   this.uploader=new FileUploader({
    url:this.basurl+ 'Users/add-photo',
     authToken:'Bearer '+ this.acountservice.CurrentUser()?.token,
     isHTML5:true,
     allowedFileType:['image'],
     removeAfterUpload:true,
     autoUpload:false,
     maxFileSize:0,
   })
   this.uploader.onAfterAddingFile=(file)=>{
    file.withCredentials=false
   }
   this.uploader.onSuccessItem=(item,Response,states,Headers)=>{
  const photo=JSON.parse(Response)
  const updatedmember:any={...this.member()}
  updatedmember.photos?.push(photo);
  this.memberchange.emit(updatedmember);
   }
  }
}
