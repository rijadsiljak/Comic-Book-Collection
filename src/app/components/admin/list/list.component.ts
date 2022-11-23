import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  Comic: any = [];
  dataSource: any = [];
  data = [];
  dataSet = [];
  default: string = 'Svi';
  Strip: any = [];
  page = 0;
  size = 5;
  length = 0;
  comicPublisher: string;
  cPublisher: string = 'SVI';
  selected: string;

  displayedColumns: string[] = [
    'Ordinal',
    'Name',
    'Edition',
    'Comic',
    'Publisher',
    'Edit',
    'Delete',
  ];

  constructor(private apiService: ApiService) {
    this.getPublishers();
  }

  ngOnInit() {
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
        this.dataSource = this.Comic;
      });
  }

  getNewData(obj) {
    this.apiService
      .getComics(this.page, this.size, this.cPublisher)
      .subscribe((data) => {
        this.Comic = data['items'];
        this.length = data['lenght'];
        this.dataSource = this.Comic;
      });
  }

  getPublishers() {
    this.apiService.listPublishers().subscribe((dataSet) => {
      this.Strip = dataSet;
    });
  }

  removeComic(comic: any, index: any) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteComic(comic._id).subscribe((data) => {
        this.Comic.splice(index, 1);
      });
    }
  }
}
