import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  User: any = [];
  dataSource: any = [];

  displayedColumns: string[] = ['Name', 'E-Mail', 'Group', 'Edit', 'Delete'];
  data = [];
  dataSet = [];
  default: string;
  Groups: any = [];
  page = 0;
  size = 5;
  length = 0;

  uGroup: string;
  selected: string;

  constructor(private apiService: ApiService) {
    this.getUserGroups();
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
      .getUsers(obj.pageIndex, obj.pageSize, this.uGroup)
      .subscribe((data) => {
        this.User = data['items'];
        this.length = data['lenght'];
        this.dataSource = this.User;
      });
  }

  getNewData(obj) {
    this.apiService
      .getUsers(this.page, this.size, this.uGroup)
      .subscribe((data) => {
        this.User = data['items'];
        this.length = data['lenght'];
        this.dataSource = this.User;
      });
  }

  removeUser(user: any, index: any) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteUser(user._id).subscribe((data) => {
        this.User.splice(index, 1);
      });
    }
  }

  getUserGroups() {
    this.apiService.listUserGroups().subscribe((dataSet) => {
      this.Groups = dataSet;
    });
  }
}
