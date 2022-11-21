import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  getMatFormFieldMissingControlError,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { ApiService } from './services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './components/admin/create/create.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { ListComponent } from './components/admin/list/list.component';
import { ComicsComponent } from './components/comics/comics.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { MyCollectionComponent } from './components/my-collection/my-collection.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { UserCreateComponent } from './components/admin/user-create/user-create.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { MatSelectModule } from '@angular/material/select';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ProfileComponent } from './components/authentication/profile/profile.component';
import { UserEditComponent } from './components/admin/user-edit/user-edit.component';
import { MatTable, MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    ComicDetailComponent,
    CreateComponent,
    EditComponent,
    ListComponent,
    ComicsComponent,
    MyCollectionComponent,
    LoginComponent,
    UserCreateComponent,
    AdminComponent,

    UserListComponent,
    RegisterComponent,
    ProfileComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
