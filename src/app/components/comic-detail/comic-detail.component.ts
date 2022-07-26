import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Comic } from 'src/app/Comic';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ComicService } from 'src/app/services/comic.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent implements OnInit {

  comics: Comic[]=[];
  comic$!: Observable<Comic>;
  constructor(private comicService:ComicService,    
    private route: ActivatedRoute,
    private router: Router
    ) { }



  ngOnInit(): void {

    this.comicService.getComics().subscribe((comics) => (this.comics = comics) );


    this.comic$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.comicService.getComic(params.get('id')!))
    );
  }
  }

function id(id: any) {
  throw new Error('Function not implemented.');
}

