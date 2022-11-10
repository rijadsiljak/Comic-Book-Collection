import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import {
  AuthenticationService,
  UserDetails,
} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.css'],
})
export class MyCollectionComponent implements OnInit {
  Comic: any = [];
  isLoading: boolean = false;
  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.auth.profile().subscribe(
      (user) => {
        this.readComic(user._id);
      },
      (err) => {
        console.error(err);
        this.isLoading = false;
      }
    );
  }

  readComic(id: any) {
    this.apiService.getMyCollection(id).subscribe((data) => {
      this.Comic = data;
      this.isLoading = false;
    });
  }
}
