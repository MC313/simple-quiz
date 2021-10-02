import { Component } from '@angular/core';
import { FormControl, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'fn-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent {
  
  phoneNumber: number;

  constructor() { }

  onSubmit({ phone }: { phone: number }) {
    console.log("SUBMITTING......", `+1${phone}`)
  }
}
