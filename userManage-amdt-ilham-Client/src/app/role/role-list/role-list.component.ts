import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, output } from '@angular/core';
import { UserMenageService } from '../../user-menage.service';
import { Observable } from 'rxjs';
import { RoleModel } from '../../_models/role';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-list',
  imports: [CommonModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit {

  @Output() updateRole: EventEmitter<RoleModel> = new EventEmitter<RoleModel>();

    private userService = inject(UserMenageService);

    roleTypes$:Observable<RoleModel[]>| undefined;

  ngOnInit(): void {
    this.roleTypes$ = this.userService.getAllRoles();
  }

  onUpdate(role: RoleModel): void {
      this.updateRole.emit(role);
    }
  
    onDelete(roleTypeId: number): void {
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
          this.userService.deleteRole(roleTypeId).subscribe({
            next: () => {
              Swal.fire('Deleted!', 'The role has been deleted.', 'success');
              //  refresh the user list 
              this.roleTypes$ = this.userService.getAllRoles();
            },
            error: (err) => {
              Swal.fire('Error!', 'Failed to delete the role.', 'error');
              console.error('Error deleting role:', err);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          
          Swal.fire('Cancelled', 'The role is safe :)', 'error');
        }
      });
    }

}
