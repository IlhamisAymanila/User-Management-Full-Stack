import { Component } from '@angular/core';
import { RegisterpageComponent } from "../registerpage/registerpage.component";

@Component({
  selector: 'app-register',
  imports: [RegisterpageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  users: any;
  registerMode = false;

  registerToggle(){
    this.registerMode = !this.registerMode
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
