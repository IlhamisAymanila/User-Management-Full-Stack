import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { StatusComponent } from './status/status.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: '',component:RegisterComponent},
    {path: 'user',component:UserComponent},
    {path: 'role',component:RoleComponent},
    {path: 'status',component:StatusComponent},
    {path: '**',component:AppComponent, pathMatch:'full'},
    
];
