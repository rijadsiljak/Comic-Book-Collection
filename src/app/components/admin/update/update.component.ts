import { HttpClient } from '@angular/common/http';
import { Component,Output,EventEmitter, Inject, Input, OnInit,Optional } from '@angular/core';
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
  comic?:Comic;
  id?: number;
  text: string;
  edition: string;
  ordinal: string;
  link: string;
  own: boolean;


  constructor(
    private comicService:ComicService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id=data.id
    this.text = data.text;
    this.ordinal=data.ordinal;
    this.edition=data.edition;
    this.link=data.link;
    this.own=data.own
  }

  ngOnInit() {
   
  }



updateComic( )  {
  this.comic = new Comic();
  this.comic.text = this.text;
  this.comic.edition=this.edition
  this.comic.ordinal=this.ordinal
  this.comic.link=this.link;
  this.comic.own=this.own;
 this.comic.id=this.id
  this.comicService.updateComics(this.comic)
  .subscribe();
}
   closeDialog() {
   
  

  }

 

  onCloseConfirm() {
    this.dialogRef.close('Confirm');
}

  onNoClick(): void {
    this.dialogRef.close();
  }
}