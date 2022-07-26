import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ListComponent } from './components/admin/list/list.component';
import { CreateComponent } from './components/admin/create/create.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { ComicsComponent } from './components/comics/comics.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';

const routes: Routes = [
  {path: '', component: ComicsComponent},
  { path: 'create' ,component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'comic-detail/:id', component: ComicDetailComponent },
  { path: 'list' ,component: ListComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }