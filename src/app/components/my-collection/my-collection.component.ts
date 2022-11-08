
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService, UserDetails } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.css']
})
export class MyCollectionComponent implements OnInit {

  details: UserDetails;

  detailsForm!: FormGroup;
Comic: any =  [];

  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private auth: AuthenticationService,) {
      this.auth.profile().subscribe(user => {
        this.details = user;
        this.readComic();
      }, (err) => {
        console.error(err);
      })
      // this.readComic();
  }


  ngOnInit()  {

  }
  



  readComic() {
  // if(this.details === undefined) {return}
   let  ids = this.details._id
  // let ids = '63570f5763e9f3f4f93c0f8b'

    this.apiService.getMyCollection(ids).subscribe((data) => {

      this.Comic = data;
    })
  }



}
