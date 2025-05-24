import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserMenageService } from '../user-menage.service';
import { StatusModel } from '../_models/status';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StatusListComponent } from "./status-list/status-list.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-status',
  imports: [ReactiveFormsModule, CommonModule, StatusListComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent implements OnInit {
  statusForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private userService: UserMenageService
  ){}
  
  ngOnInit(): void {
    this.initializationForm();
  }

  private initializationForm(): void{
    this.statusForm = this.fb.group({
      statusId:[null],
      statusName:[''],
      description:['']
    });
  }

  onSubmit(): void{
        if(this.statusForm.valid){
          const status: StatusModel = this.statusForm.value;
  
          if(status.statusId && status.statusId > 0){
            this.updateStatus(status);
          }else{
            this.createStatus(status);
          }
        }else{
          console.log('Form is invalid');
        }
      }

      private createStatus(status: StatusModel): void {
        this.userService.createStatus(status).subscribe({
            next: (response) => {
                console.log('Status Created:', response);
    
                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Status Created',
                    text: 'The status has been successfully added!',
                    confirmButtonText: 'OK'
                });
    
                this.resetForm(); // Reset the form after successful creation
                window.location.reload();
            },
            error: (error) => {
                console.error('Error Creating Status:', error);
    
                // Show error message
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Something went wrong while creating the status. Please try again.',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
      
          private updateStatus(status: StatusModel): void{
            this.userService.updateStatus(status)
            .pipe(
              tap((response)=>{
                console.log('Status updated:', response);
                this.resetForm();

                window.location.reload();
            }),
            catchError((error) => {
              console.error('Error Updating Status:', error);
              return of(null);
            })
          )
          .subscribe();
              
          }
      
          private resetForm(): void {
            this.statusForm.reset();
           }
      
           onUpdate(status: StatusModel): void {
               this.statusForm.patchValue(status); // Populating form with selected user details
             }

}
