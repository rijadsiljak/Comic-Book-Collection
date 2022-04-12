import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { ComicItemComponent } from './components/comic-item/comic-item.component';
import { ComicsComponent } from './components/comics/comics.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: ComicsComponent},

  {path: 'details/:id', component: ComicDetailComponent}, 
  { path: 'admin', component: AdminComponent },
  { path: '**', component: PageNotFoundComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
