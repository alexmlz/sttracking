import { PlanService } from './plan.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTreeModule, MatIconModule, MatStepperModule, MatMenuModule, MatToolbarModule,
  MatTabsModule, MatGridListModule, MatCardModule, MatSnackBarModule, MatProgressSpinnerModule,
  MatBottomSheetModule, MatDialogModule, MatSelectModule, MatRadioModule, MatCheckboxModule,
  MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';

import {AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlansComponent } from './plans/plans.component';
import { PlandetailsComponent } from './plandetails/plandetails.component';
import { FormsModule } from '@angular/forms';
import { SectiondetailsComponent } from './sectiondetails/sectiondetails.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { StfooterComponent } from './stfooter/stfooter.component';
import { CreatesheetComponent } from './createsheet/createsheet.component';
import { CreatesectionsheetComponent } from './createsectionsheet/createsectionsheet.component';
import { CreateexercisedialogComponent } from './createexercisedialog/createexercisedialog.component';
import { CreatecustomexercisedialogComponent } from './createcustomexercisedialog/createcustomexercisedialog.component';
import { LoginMeSnackBarComponent } from './login-me-snack-bar/login-me-snack-bar.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlansComponent,
    PlandetailsComponent,
    SectiondetailsComponent,
    NavbarComponent,
    LoadingSpinnerComponent,
    StfooterComponent,
    CreatesheetComponent,
    CreatesectionsheetComponent,
    CreateexercisedialogComponent,
    CreatecustomexercisedialogComponent,
    LoginMeSnackBarComponent,
    AdminUserComponent
  ],
  entryComponents: [
    CreatesheetComponent,
    CreatesectionsheetComponent,
    CreateexercisedialogComponent,
    CreatecustomexercisedialogComponent,
    LoginMeSnackBarComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatTreeModule,
    MatIconModule,
    MatStepperModule,
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule

  ],
  providers: [
    PlanService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
