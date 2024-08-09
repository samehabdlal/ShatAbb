import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_servec/members.service';
import { Member } from '../../_INterFace/members';
import { NgFor } from '@angular/common';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    NgFor,
    MemberCardComponent
],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{
  public memberserves=inject(MembersService);
  ngOnInit(): void {
 if(this.memberserves.members().length==0) this.loadmembers()
  }
  loadmembers(){
    this.memberserves.getmembers()
  }
}
