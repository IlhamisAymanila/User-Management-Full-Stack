import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { FormsModule } from '@angular/forms';
import { UserMenageService } from './user-menage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'userManage-amdt-ilham-Client';

  private userService = inject(UserMenageService);


  setCurrentUser(){
    const userString = localStorage.getItem('appuser');
    if(!userString) return;

    const user = JSON.parse(userString);
    this.userService.currentUser.set(user);
  }
}
