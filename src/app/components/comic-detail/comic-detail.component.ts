
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from 'src/app/services/api.service';
import { Comic } from 'src/app/model/comic';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { any } from 'webidl-conversions';
@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent implements OnInit {
  submitted = false;
  detailsForm!: FormGroup;
  ComicData: Comic[] | undefined;
  comic$!: Observable<Comic>;
  comics: Comic[] = [];

  name!: string;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute

  ) { 
    
    //this.readComic(); 
  }

  Comic: any = [];
  ngOnInit() {


    this.comic$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.apiService.getComic(params.get('id')!))
    );
  

    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getComic(id);


    this.detailsForm = this.fb.group({


      name: ['', [Validators.required]],
      redni: ['', [Validators.required]],
      edition: ['', [Validators.required]],
      cover: ['', [Validators.required]],
      own: []
    })

  }


  readComic(){
    this.apiService.getComics(0,9).subscribe((data) => {
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
        ordinal: data['redni'],
        edition: data['edition'],
        cover: data['cover'],
        own: data['own'],
      });
    });
  }


}