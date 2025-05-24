import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserMenageService } from '../user-menage.service';
import { UserDetails } from '../_models/user';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserListComponent } from "./user-list/user-list.component";
import { CommonModule } from '@angular/common';
import { RoleModel } from '../_models/role';
import { StatusModel } from '../_models/status';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule, UserListComponent, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private userService: UserMenageService
  ){}

  roles$: Observable<RoleModel[]>|undefined;
  statuses$: Observable<StatusModel[]>| undefined;

  
  
  ngOnInit(): void {
    this.initializationForm();
    this.getRoles();
    this.getStatus();
  }

  private initializationForm(): void {
    this.userForm = this.fb.group({
      userId:[null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      dateOfBirth: ['', Validators.required],
      roleTypeId: [null],
      statusId: [null],
    });
  }

  private getRoles(): void{
    this.roles$ = this.userService.getAllRoles();
    console.log(this.roles$)
  }

  private getStatus(): void{
    this.statuses$ = this.userService.getAllStatus();
  }

  
  onSubmit(): void {
    if (this.userForm.valid) {
      const userDetails: UserDetails = this.userForm.value;
  
      if (userDetails.userId && userDetails.userId > 0) {
        this.updateUser(userDetails);
      } else {
        this.createUser(userDetails);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  
  

  createUser(userDetails: UserDetails): void {
    console.log('Sending Data:', userDetails); // Log the payload

    this.userService.createUser(userDetails).subscribe({
      next: (r) => {
        console.log('Response:', r);

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'User Created',
          text: 'The user has been successfully added!',
          confirmButtonText: 'OK'
        });

        this.resetForm();
        window.location.reload();
      },
      error: (error) => {
        console.log('Error:', error);

        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Something went wrong! Please try again.',
          confirmButtonText: 'OK'
        });
      }
    });
}

  private updateUser(userDetails: UserDetails): void {
    this.userService
      .updateUser(userDetails)
      .pipe(
        tap((response) => {
          console.log('User Updated:', response);
          this.resetForm();
          window.location.reload();
        }),
        catchError((error) => {
          console.error('Error Updating User:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  private resetForm(): void {
   this.userForm.reset();
  }

  onUpdateUser(user: UserDetails): void {
    this.userForm.patchValue(user); // Populating form with selected user details
  }

  

}
