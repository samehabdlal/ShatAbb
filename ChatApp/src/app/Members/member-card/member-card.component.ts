import { Component, inject, input, OnInit } from '@angular/core';
import { Member } from '../../_INterFace/members';
import * as AOS from 'aos';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent implements OnInit {
  router=inject(Router)
  actrouter=inject(ActivatedRoute)
  ngOnInit(): void {
    AOS.init();
  }

  navgateroute(username:string){
    this.router.navigate([username],{
      relativeTo:this.actrouter
    })

  }
  member=input.required<Member>()
}
