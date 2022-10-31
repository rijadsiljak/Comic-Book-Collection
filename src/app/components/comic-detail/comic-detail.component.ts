
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from 'src/app/services/api.service';
import { Comic } from 'src/app/model/comic';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { any } from 'webidl-conversions';
import { AuthenticationService, UserDetails } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent implements OnInit {
  details: UserDetails;
  submitted = false;
  detailsForm!: FormGroup;
 // ComicData: Comic[] | undefined;
  comic$!: Observable<Comic>;

//  comics: Comic[] = [];

  name!: string;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService

  ) {

    //this.readComic(); 
  }

  Comic: any = [];
  ngOnInit(

  ) {


    this.comic$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.apiService.getComic(params.get('id')!))
    );

    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
    

    let id = this.actRoute.snapshot.paramMap.get('id');
  

    this.getComic(id);


    this.detailsForm = this.fb.group({


      name: ['', [Validators.required]],
      redni: ['', [Validators.required]],
      comic: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      edition: ['', [Validators.required]],
      cover: ['', [Validators.required]],
      own: []
    })

  }


  readComic() {
    this.apiService.listComics().subscribe((data) => {
      this.Comic = data;
    })
  }

  // Getter to access form control
  get myForm() {
    return this.detailsForm.controls;
  }

  getComic(id: any) {
    this.apiService.getComic(id).subscribe(data => {
      this.detailsForm.setValue({

        name: data['name'],
        redni: data['redni'],
        edition: data['edition'],
        comic: data['comic'],
        publisher: data['publisher'],
        cover: data['cover'],
        own: data['own'],

      });
    });
  }



  onSubmit() {
    this.submitted = true;
    {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateComicOwn(id)
          .subscribe(res => {
            this.router.navigateByUrl('/list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }

    }
  }


  addComic() {
    this.submitted = true;
    {
      if (window.confirm('Are you sure?')) {
        
        let id = this.actRoute.snapshot.paramMap.get('id');
        let ids = this.details._id
        this.apiService.addComicOwntoUser(ids,id)
          .subscribe(res => 
            {
            this.router.navigateByUrl('/list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
   
    }
  }


}