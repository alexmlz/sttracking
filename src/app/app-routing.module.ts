import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { SectiondetailsComponent } from './sectiondetails/sectiondetails.component';
import { PlandetailsComponent } from './plandetails/plandetails.component';
import { PlansComponent } from './plans/plans.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
 // {path: '', component: HomeComponent},
  {path: '', component: PlansComponent},
  {path: 'plandetails/:id', component: PlandetailsComponent , canActivate: [AuthGuard]},
  {path: 'sectiondetails/:planId/:secid', component: SectiondetailsComponent , canActivate: [AuthGuard]},
  {path: 'admin/users' , component: AdminUserComponent, canActivate: [AuthGuard , AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
