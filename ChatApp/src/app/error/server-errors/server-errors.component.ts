import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-errors',
  standalone: true,
  imports: [],
  templateUrl: './server-errors.component.html',
  styleUrl: './server-errors.component.scss'
})
export class ServerErrorsComponent {
error:any
constructor(private router:Router){
  const navgate=this.router.getCurrentNavigation();
  this.error=navgate?.extras.state?.['error'];
}
}
