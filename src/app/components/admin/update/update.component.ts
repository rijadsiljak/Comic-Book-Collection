import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit,Optional } from '@angular/core';
import { Comic } from 'src/app/Comic';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ComicService } from 'src/app/services/comic.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminComponent } from '../admin/admin.component';




@Component({
  selector: 'app-admin',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  comics: Comic[] = [];
  id?: number;
  text?: string;
  edition?: string;
  ordinal?: string;

  constructor(
    private comicService:ComicService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id=data.id
    this.text = data.text;
    this.ordinal=data.ordinal;
    this.edition=data.edition;
  }

  ngOnInit() {
  }

  updateComic(comic: Comic) {
    comic.text = comic.text;
    this.comicService.updateComicOwn(comic)
    .subscribe(
      () => (this.comics = this.comics.filter((c) => c.id !== comic.id))
    );
}

  closeDialog() {
   
  }
}