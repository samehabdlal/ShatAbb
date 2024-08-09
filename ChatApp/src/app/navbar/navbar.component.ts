import {
  Component,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AcountService } from '../_servec/acount.service';
import { NgIf, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:
   [
     FormsModule, 
     NgIf,
     BsDropdownModule,
     RouterModule,
     TitleCasePipe
   ], 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(
    public AcountService: AcountService,
    private router:Router,
    private toster:ToastrService
  ) {}
  ngOnInit(): void {}
  model: any = {};
  login(type: NgForm) {
    this.model = type.value;
    this.AcountService.login(this.model).subscribe({
      next: _ => {
       void this.router.navigateByUrl('/members')
       void type.reset();
       this.toster.success('You are logged in')
      },
      error:_=>{this.toster.error('username is invalid')},
      complete: () => {},
    });
  }
  logout() {
    this.AcountService.logout();
     this.router.navigateByUrl('/');
  }
}
