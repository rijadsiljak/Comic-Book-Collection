import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComicsComponent } from './components/comics/comics.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ComicItemComponent } from './components/comic-item/comic-item.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { InsertComponent } from './components/admin/insert/insert.component';
import { DeleteComponent } from './components/admin/delete/delete.component';
import { UpdateComponent } from './components/admin/update/update.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getMatFormFieldMissingControlError, MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ComicsComponent,
    HeaderComponent,
    ComicItemComponent,
    ComicDetailComponent,
    FooterComponent,
    PageNotFoundComponent,
    AdminComponent,
    InsertComponent,
    DeleteComponent,
    UpdateComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  MatDialogModule,
  BrowserAnimationsModule,
  MatFormFieldModule,

  FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
