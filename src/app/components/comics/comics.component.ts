import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css'],
})
export class ComicsComponent implements OnInit {
  data = [];
  dataSet = [];
  Comic: any = [];
  default: string = 'Svi';
  Strip: any = [];
  page = 0;
  size = 9;
  length = 0;
  comicPublisher: string;
  cPublisher: string = 'SVI';
  selected: string;
  constructor(private apiService: ApiService) {
    this.getPublishers();
  }

  ngOnInit(): void {
    this.getData({
      pageIndex: this.page,
      pageSize: this.size,
      comicPublisher: '',
    });
  }

  getData(obj) {
    this.apiService
      .getComics(obj.pageIndex, obj.pageSize, this.cPublisher)
      .subscribe((data) => {
        this.Comic = data['items'];
        this.length = data['lenght'];
        this.data = this.Comic;
      });
  }

  getNewData(obj) {
    this.apiService
      .getComics(this.page, this.size, this.cPublisher)
      .subscribe((data) => {
        this.Comic = data['items'];
        this.length = data['lenght'];
        this.data = this.Comic;
      });
  }

  getPublishers() {
    this.apiService.listPublishers().subscribe((dataSet) => {
      this.Strip = dataSet;
    });
  }

  changeSelection(selection) {
    console.log(selection.value);
    this.selected = selection.value;
  }
}
