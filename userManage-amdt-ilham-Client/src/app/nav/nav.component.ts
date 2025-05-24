import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserMenageService } from '../user-menage.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterLink,FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
 userService = inject(UserMenageService); 
 
  model: any = {};

  login(){
   this.userService.login(this.model).subscribe({
    next: r =>{
      console.log(r);
    },
    error: error => console.log(error)
    
      
   })
  }

  logout(){
    this.userService.logout();
  }
}
