import { Component, Input, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { Comic } from 'src/app/Comic';
import { ComicService } from 'src/app/services/comic.service';
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA, MatDialog,MatDialogRef } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { MatTable } from '@angular/material/table';
import { InsertComponent } from '../insert/insert.component';

export interface UpdateData
{
  text?: string;
  ordinal?: string;
  edition?: string;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  comics: Comic[] = [];
  text?: string;


  ordinal?: string;
  edition?: string;
  constructor(private comicService: ComicService,
    public dialog: MatDialog
  ) { }


  faTimes = faTimes;
  facog = faCog;

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
 
    
  openDialog(comic:Comic) {

    let dialogRef = this.dialog.open(UpdateComponent,
    {
      width: '250px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { ordinal : comic.ordinal, text: comic.text, edition: comic.edition}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.text = result.data;
      this.ordinal= result.data;
      this.edition=result.data
    });

  }



}
