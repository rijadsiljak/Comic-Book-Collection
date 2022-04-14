import { Component, Input, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { Comic } from 'src/app/Comic';
import { ComicService } from 'src/app/services/comic.service';
import { faCog, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { MatTable } from '@angular/material/table';
import { InsertComponent } from '../insert/insert.component';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export interface UpdateData {
  text?: string;
  ordinal?: string;
  edition?: string;
  comic?: Comic;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  comics: Comic[] = [];
comic?: Comic;
  id?: number;
  text?: string;
  own?: boolean;
  link?: string;
  ordinal?: string;
  edition?: string;

  showAddComic: boolean = false;
  subscription: Subscription;

  constructor(private comicService: ComicService,
    public dialog: MatDialog,
    private uiservice: UiServiceService,
    private router: Router

  ) {
    this.subscription = this.uiservice
    .onToggle()
    .subscribe((value) => (this.showAddComic = value));

   }


  faTimes = faTimes;
  facog = faCog;
  faplus = faPlusCircle;
  ngOnInit(): void {

    this.comicService.getComics().subscribe((comics) => (this.comics = comics));

  }

  deleteComic(comic: Comic) {
    this.comicService
      .deleteComic(comic)
      .subscribe(
        () => (this.comics = this.comics.filter((c) => c.id !== comic.id))
      );
  }


  openDialog(comic: Comic) {

    let dialogRef = this.dialog.open(UpdateComponent,
      {
        width: '250px',
        backdropClass: 'custom-dialog-backdrop-class',
        panelClass: 'custom-dialog-panel-class',
        data: { ordinal: comic.ordinal, text: comic.text, edition: comic.edition, id: comic.id, link: comic.link, own: comic.own }
      });

  }
  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  toggleAddComic() {
    this.uiservice.toggleAddComic();
  }

  addComic(comic:Comic) {
    //this.comic= new Comic();
    alert('Comic has been added');
   // this.comicService.addComic(this.comic).subscribe((comic) => this.comics.push(comic));
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }

}
