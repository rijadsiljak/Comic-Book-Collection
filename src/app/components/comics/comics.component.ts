import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  Comic:any = [];

  constructor(private apiService : ApiService) { 
    this.readComic();

  }

  ngOnInit(): void {
  }

  readComic()
  {
this.apiService.getComics().subscribe((data)=> { 
this.Comic=data;  
})
  }
}
