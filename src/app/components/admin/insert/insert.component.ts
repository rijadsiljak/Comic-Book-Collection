import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Subscription } from 'rxjs';
import { Comic } from 'src/app/Comic';
import { ComicService } from 'src/app/services/comic.service';
@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

@Output() onAddComic: EventEmitter<Comic> = new EventEmitter();

comic?: Comic;
id?: number;
text?: string;
own?: boolean;
link?: string;
edition?: string;
ordinal?: string;


showAddComic?: boolean = false;
subscription?: Subscription;


  constructor (private uiService: UiServiceService,
    private comicService: ComicService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddComic = value));
  }

  ngOnInit(): void {
  }


  
onSubmit() {
  if (!this.text) {
    alert('Please add a comic!');
    return;
  }

  this.comic = new Comic();
  this.comic.text = this.text;
  this.comic.edition=this.edition
  this.comic.ordinal=this.ordinal
  this.comic.link=this.link;
  this.comic.own=this.own;
  this.comic.id=this.id
  this.comicService.addComic(this.comic)
  .subscribe();



this.text = '';
this.own = false;
this.link = '';
this.ordinal='';
this.edition='';
this.id=-1;

}


}

