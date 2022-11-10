import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ListComponent } from './components/admin/list/list.component';
import { CreateComponent } from './components/admin/create/create.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { ComicsComponent } from './components/comics/comics.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { MyCollectionComponent } from './components/my-collection/my-collection.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { UserCreateComponent } from './components/admin/user-create/user-create.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ProfileComponent } from './components/authentication/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserEditComponent } from './components/admin/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', component: ComicsComponent },
  { path: 'my-collection', component: MyCollectionComponent },
  { path: 'comics', component: ComicsComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'user-edit/:id', component: UserEditComponent },
  { path: 'comic-detail/:id', component: ComicDetailComponent },
  { path: 'list', component: ListComponent },
  { path: 'main', component: ComicsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'add-user', component: UserCreateComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
