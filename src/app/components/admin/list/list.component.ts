import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
  
})
export class ListComponent implements OnInit {

  Comic:any = [];

  constructor(private apiService : ApiService) { 
    this.readComic();
  }

  ngOnInit() {}

  readComic(){
    this.apiService.listComics().subscribe((data) => {
     this.Comic = data;
    })    
  }

  removeComic(comic:any, index:any) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteComic(comic._id).subscribe((data) => {
          this.Comic.splice(index, 1);
        }
      )    
    }
  }



}
 