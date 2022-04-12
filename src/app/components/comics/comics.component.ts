import { Component, OnInit } from '@angular/core';
import { Comic } from 'src/app/Comic';
import { ComicService } from 'src/app/services/comic.service';


@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  comics: Comic[]=[];
  constructor(private comicService:ComicService) { }



  ngOnInit(): void {

    this.comicService.getComics().subscribe((comics) => (this.comics = comics) );

  }

  onToggleComicOwn(comic: Comic) {
    comic.own = !comic.own;
    this.comicService.updateComicOwn(comic).subscribe();
  }

}
