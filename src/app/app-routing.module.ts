import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ListComponent } from './components/admin/list/list.component';
import { CreateComponent } from './components/admin/create/create.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { ComicsComponent } from './components/comics/comics.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
<<<<<<< HEAD
import { MyCollectionComponent } from './components/my-collection/my-collection.component';
import { LoginComponent } from './components/login/login.component';
import { UserCreateComponent } from './components/admin/user-create/user-create.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { FileUploadComponent } from './components/admin/file-upload/file-upload.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'main', component: ComicsComponent},
  { path: 'my-collection' ,component: MyCollectionComponent },
=======

const routes: Routes = [
  {path: '', component: ComicsComponent},
>>>>>>> 18b710e (CRUD)
  { path: 'create' ,component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'comic-detail/:id', component: ComicDetailComponent },
  { path: 'list' ,component: ListComponent },
  { path: 'admin' ,component: AdminComponent },
  { path: 'file-upload' ,component: FileUploadComponent },
  { path: 'add-user' ,component: UserCreateComponent },
  { path: 'user-list' ,component: UserListComponent },
  { path: '**', component: PageNotFoundComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
