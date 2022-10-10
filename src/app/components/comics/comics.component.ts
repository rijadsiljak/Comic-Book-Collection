import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  data = [];
  Comic:any = [];

  constructor(private apiService : ApiService) { 
    this.readComic();

  }

  ngOnInit(): void {

    this.getData({pageIndex: 0, pageSize: 9});
  }

  page = 0;
  size = 3;



  readComic()
  {
this.apiService.getComics().subscribe((data)=> { 
this.Comic=data;  
})
  }



  getData(obj) {
    let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

    this.data = this.Comic.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

}
