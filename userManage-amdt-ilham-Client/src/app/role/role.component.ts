import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserMenageService } from '../user-menage.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { StatusModel } from '../_models/status';
import { RoleModel } from '../_models/role';
import { RoleListComponent } from "./role-list/role-list.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  imports: [ReactiveFormsModule, CommonModule, RoleListComponent],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {

  roleForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private userService: UserMenageService
  ){}

  ngOnInit(): void {
    this.initializationForm();
    this.getStatus();
  }

  //array of status object state
    statuses$: Observable<StatusModel[]>| undefined;

    private initializationForm(): void{
      this.roleForm = this.fb.group({
        roleTypeId:[null],
        roleName:[''],
        description:[''],
        statusId:[null]
      });
    }

    //get all status
    private getStatus(): void{
      this.statuses$ = this.userService.getAllStatus();
    }

    onSubmit(): void{
      if(this.roleForm.valid){
        const roleType: RoleModel = this.roleForm.value;

        if(roleType.roleTypeId && roleType.roleTypeId > 0){
          this.updateRole(roleType);
        }else{
          this.createRole(roleType);
        }
      }else{
        console.log('Form is invalid');
      }
    }

    private createRole(roleType: RoleModel): void {
      this.userService.createRoleType(roleType).subscribe({
          next: (response) => {
              console.log('Role Created:', response);
  
              // Show success message
              Swal.fire({
                  icon: 'success',
                  title: 'Role Created',
                  text: 'The role has been successfully added!',
                  confirmButtonText: 'OK'
              });
  
              this.resetForm(); // Reset the form after successful creation
              window.location.reload();
          },
          error: (error) => {
              console.error('Error Creating Role:', error);
  
              // Show error message
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: error.message || 'Something went wrong while creating the role. Please try again.',
                  confirmButtonText: 'OK'
              });
          }
      });
  }

    private updateRole(roleType:RoleModel): void{
      this.userService.updateRole(roleType)
      .pipe(
        tap((response)=>{
          console.log('Role updated:', response);
          this.resetForm();
          window.location.reload();
      }),
      catchError((error) => {
        console.error('Error Updating Role:', error);
        return of(null);
      })
    )
    .subscribe();
        
    }

    private resetForm(): void {
      this.roleForm.reset();
     }

     onUpdate(role: RoleModel): void {
         this.roleForm.patchValue(role); // Populating form with selected user details
       }

}


