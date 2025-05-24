import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { StatusModel } from '../../_models/status';
import { Observable } from 'rxjs';
import { UserMenageService } from '../../user-menage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-status-list',
  imports: [CommonModule],
  templateUrl: './status-list.component.html',
  styleUrl: './status-list.component.css'
})
export class StatusListComponent implements OnInit {

  @Output() statusRole: EventEmitter<StatusModel> = new EventEmitter<StatusModel>();
  
  private userService = inject(UserMenageService);
  
      Statuses$:Observable<StatusModel[]>| undefined;

  ngOnInit(): void {
    this.Statuses$ = this.userService.getAllStatus();
  }

  onUpdate(status: StatusModel): void {
        this.statusRole.emit(status);
      }

    onDelete(statusId: number): void {
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
              this.userService.deleteStatus(statusId).subscribe({
                next: () => {
                  Swal.fire('Deleted!', 'The status has been deleted.', 'success');
                  //  refresh the user list 
                  this.Statuses$ = this.userService.getAllStatus();
                },
                error: (err) => {
                  Swal.fire('Error!', 'Failed to delete the status.', 'error');
                  console.error('Error deleting status:', err);
                }
              });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              
              Swal.fire('Cancelled', 'The role is safe :)', 'error');
            }
          });
        }  

}
