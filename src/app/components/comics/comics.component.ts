import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  data = [];
  Comic: any = [];
  page = 0;
  size = 9;
  length = 0;
  constructor(private apiService: ApiService) {


  }



  ngOnInit(): void {

    this.getData({ pageIndex: this.page, pageSize: this.size });

  }



  getData(obj) {
    this.apiService.getComics(obj.pageIndex,obj.pageSize).subscribe((data) => {
      this.Comic = data['items'];   
      this.length=data['lenght'];
       this.data = this.Comic;
    });

  }

}
