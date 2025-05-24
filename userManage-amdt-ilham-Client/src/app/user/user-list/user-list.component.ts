import {  Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { UserMenageService } from '../../user-menage.service';
import { map, Observable } from 'rxjs';
import { UserDetails } from '../../_models/user';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { FilterUsersPipe } from '../../filter-users.pipe';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule,FormsModule,FilterUsersPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  
 

  @Output() updateUser: EventEmitter<UserDetails> = new EventEmitter<UserDetails>();

  private userService = inject(UserMenageService);
  users$:Observable<UserDetails[]>| undefined;
  searchText: string = '';

  ngOnInit(): void {
    this.users$ = this.userService.getAllUsers();
  }

  

  onUpdate(user: UserDetails): void {
    this.updateUser.emit(user);
  }

  onDelete(userId: number): void {
    // confirmation popup
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this again!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, call the delete method
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            //  refresh the user list 
            this.users$ = this.userService.getAllUsers();
          },
          error: (err) => {
            Swal.fire('Error!', 'Failed to delete the user.', 'error');
            console.error('Error deleting user:', err);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
        Swal.fire('Cancelled', 'The user is safe :)', 'error');
      }
    });
  }

  
}
