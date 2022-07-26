import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
<<<<<<< HEAD
import { MatPaginator } from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';

=======
>>>>>>> 18b710e (CRUD)
@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
<<<<<<< HEAD
  data = [];
=======

>>>>>>> 18b710e (CRUD)
  Comic:any = [];

  constructor(private apiService : ApiService) { 
    this.readComic();

  }

  ngOnInit(): void {
<<<<<<< HEAD
    this.getData({pageIndex: 0, pageSize: 9});
  }

  page = 0;
  size = 3;

=======
  }

>>>>>>> 18b710e (CRUD)
  readComic()
  {
this.apiService.getComics().subscribe((data)=> { 
this.Comic=data;  
})
  }
<<<<<<< HEAD



  getData(obj) {
    let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

    this.data = this.Comic.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

=======
>>>>>>> 18b710e (CRUD)
}
