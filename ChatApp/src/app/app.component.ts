import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { AcountService } from './_servec/acount.service';
import { HomeComponent } from "./home/home.component";
import { RegsterComponent } from "./regster/regster.component";
import { ButhyService } from './_servec/buthy.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    NavbarComponent,
    HomeComponent,
    RegsterComponent,
    RouterModule,
    NgIf
],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title='AppComponent'
 constructor(){}
 private acountServes=inject(AcountService);
 public buthy=inject(ButhyService);
 ngOnInit(): void {
  this.setcurrentuser()
    }
    setcurrentuser(){
      const userstring= localStorage.getItem('user')
      if(!userstring) return 
      const user=JSON.parse(userstring)
      this.acountServes.CurrentUser.set(user);
    }
}
