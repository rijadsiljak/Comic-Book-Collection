import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.css']
})
export class MyCollectionComponent implements OnInit  {

  Comic:any = [];

  constructor(private apiService : ApiService) { 
    this.readComic();

  }

  ngOnInit(): void {
  }

  readComic()
  {
this.apiService.getOwnedComics().subscribe((data)=> { 
  
this.Comic=data;  
})
  }
}
