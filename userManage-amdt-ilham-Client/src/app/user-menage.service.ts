import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment.development';
import { API_ENDPOINTS } from './api-endpoints';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { UserDetails } from './_models/user';
import { RoleModel } from './_models/role';
import { StatusModel } from './_models/status';
import { AppUser } from './_models/appUser';

@Injectable({
  providedIn: 'root'
})
export class UserMenageService {

  constructor() { }

  private http = inject(HttpClient);
  private apiUrl = environment.apiURL;

   /** Fetch All Users */
   getAllUsers(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${this.apiUrl}${API_ENDPOINTS.USER.GET_ALL}`).pipe(
      tap(users => console.log('Fetched users:', users)), 
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Failed to fetch users.'));
      })
    );
  }

  getAllRoles():Observable<RoleModel[]>{
    return this.http.get<RoleModel[]>(`${this.apiUrl}${API_ENDPOINTS.Role.GET_ALL}`).pipe(
      tap(r => console.log(r)),
      catchError(error => {
        console.error('Error fetching role:', error);
        return throwError(() => new Error('Failed to fetch role.'));
      })
    );
  }

  getAllStatus():Observable<StatusModel[]>{
    return this.http.get<StatusModel[]>(`${this.apiUrl}${API_ENDPOINTS.Status.GET_ALL}`).pipe(
      tap(p => console.log(p)),
      catchError(error => {
        console.error('Error fetching status:', error);
        return throwError(() => new Error('Failed to fetch status.'));
      })
    );
  }

  login(model:any){
    return this.http.post<AppUser>(this.apiUrl+API_ENDPOINTS.Login.LOGIN,model).pipe(
      map(user =>{
        if(user){
          localStorage.setItem('appuser', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }
  

  /** Create New User */
  createUser(userDetails: UserDetails): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}${API_ENDPOINTS.USER.CREATE}`, userDetails, { headers });
}
  

createRoleType(roleDTO: any): Observable<any> {
  const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });

  return this.http.post<any>(`${this.apiUrl}${API_ENDPOINTS.Role.CREATE}`, roleDTO, { headers });
}

  createStatus(statusDTO:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}${API_ENDPOINTS.Status.CREATE}`, statusDTO,{headers});
  }


  /** Update Existing User */
  updateUser(userDetails: UserDetails): Observable<UserDetails> {
    return this.http.put<UserDetails>(`${this.apiUrl}${API_ENDPOINTS.USER.UPDATE}`, userDetails).pipe(
      tap(user => console.log('Updated user:', user)),
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(() => new Error('Failed to update user.'));
      })
    );
  }

  updateRole(roleDTO: RoleModel): Observable<RoleModel> {
    return this.http.put<RoleModel>(`${this.apiUrl}${API_ENDPOINTS.Role.UPDATE}`, roleDTO).pipe(
      tap(r => console.log('Updated role:', r)),
      catchError(error => {
        console.error('Error updating role:', error);
        return throwError(() => new Error('Failed to update role.'));
      })
    );
  }

  updateStatus(StatusDTO: StatusModel): Observable<StatusModel> {
    return this.http.put<StatusModel>(`${this.apiUrl}${API_ENDPOINTS.Status.UPDATE}`, StatusDTO).pipe(
      tap(r => console.log('Updated State:', r)),
      catchError(error => {
        console.error('Error updating Status:', error);
        return throwError(() => new Error('Failed to update Status.'));
      })
    );
  }



  /** Delete User */
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API_ENDPOINTS.USER.DELETE}/${userId}`).pipe(
      tap(() => console.log(`Deleted user with ID: ${userId}`)),
      catchError(error => {
        console.error('Error deleting user:', error);
        return throwError(() => new Error('Failed to delete user.'));
      })
    );
  }

  deleteRole(roleTypeId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}${API_ENDPOINTS.Role.DELETE}/${roleTypeId}`).pipe(
      tap(() => console.log(`Deleted role with ID: ${roleTypeId}`)),
      catchError(error => {
        console.error('Error deleting role:', error);
        return throwError(() => new Error('Failed to delete user.'));
      })
    );
  }

  deleteStatus(statusId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}${API_ENDPOINTS.Status.DELETE}/${statusId}`).pipe(
      tap(() => console.log(`Deleted status with ID: ${statusId}`)),
      catchError(error => {
        console.error('Error deleting staus:', error);
        return throwError(() => new Error('Failed to delete status.'));
      })
    );
  }

  currentUser = signal<AppUser | null>(null)

  

  register(model:any){
    return this.http.post<AppUser>(this.apiUrl+API_ENDPOINTS.Login.REGISTER,model).pipe(
      map(user =>{
        if(user){
          localStorage.setItem('appuser', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }

  logout(){
    localStorage.removeItem('appuser');
    this.currentUser.set(null);
  }
}
