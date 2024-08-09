import {Component} from '@angular/core';
import { RegsterComponent } from '../regster/regster.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegsterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user: any;
  public  regstierMode=false
  OnCansleRegsterMode(event:boolean){
    this.regstierMode=event
  }
  regstertoogle() {
    this.regstierMode = !this.regstierMode;
  }
}
