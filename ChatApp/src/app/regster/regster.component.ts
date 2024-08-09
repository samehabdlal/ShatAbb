import { NgFor } from '@angular/common';
import { Component, inject, input, model, output} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AcountService } from '../_servec/acount.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regster',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './regster.component.html',
  styleUrl: './regster.component.scss',
})
export class RegsterComponent {
   cancleregsyter= output<boolean>();
  private acountserveca=inject(AcountService);
  private toster=inject(ToastrService);
  private router=inject(Router);
  Model: any = {
    City:'s',
    Country:'ss',
    DateOfBirth:'2024-07-27',
    Gender:'s',
    KnownAs:'s01'
  };
  regster(data: NgForm) {
    console.log(this.Model);
   this.acountserveca.register(this.Model).subscribe({
    next:_=>{
      this.toster.success('You are logged In');
     this.router.navigateByUrl('/members')
    },
    error:errors=>{this.toster.error(JSON.stringify(errors?.message))},
    complete:()=>{console.log('complets');
    }
   })
  }
  cancle() {
    this.cancleregsyter.emit(false)
  }
}
