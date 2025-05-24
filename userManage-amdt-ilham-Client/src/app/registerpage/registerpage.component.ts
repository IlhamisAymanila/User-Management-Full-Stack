import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserMenageService } from '../user-menage.service';

@Component({
  selector: 'app-registerpage',
  imports: [FormsModule],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.css'
})
export class RegisterpageComponent {
private userService = inject(UserMenageService);
 
  @Output() cancelRegister = new EventEmitter();
  model: any ={}

  register(){
    this.userService.register(this.model).subscribe({
      next: r =>{
        console.log(r);
        this.cancel();
      },
      error: error => console.log(error)
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
