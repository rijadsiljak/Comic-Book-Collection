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
    this.readComic();
  }

  ngOnInit() {}

  readComic() {
    this.apiService.listComics().subscribe((data) => {
      this.Comic = data;
      this.dataSource = this.Comic;
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
