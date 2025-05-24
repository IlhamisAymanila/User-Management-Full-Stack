export interface UserDetails {
    userId:number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    roleTypeId?: number; 
    statusId?: number; 
    roleName?:string;
    statusName?:string;

  }