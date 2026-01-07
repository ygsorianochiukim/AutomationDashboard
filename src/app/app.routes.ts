import { Routes } from '@angular/router';
import { Dashboard } from './Views/dashboard/dashboard';
import { Issues } from './Views/issues/issues';

export const routes: Routes = [
    {path: '' , redirectTo: 'dashboard' , pathMatch: 'full'},
    {path: 'dashboard' , component: Dashboard,},
    {path: 'issue' , component: Issues,}
];
