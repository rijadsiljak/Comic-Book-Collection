import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from 'src/app/services/api.service';
//import { Comic } from 'src/app/model/comic';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  submitted = false;
  editForm!: FormGroup;
 // ComicData: Comic[] | undefined;


  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateComic();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getComic(id);
    this.editForm = this.fb.group({
  
      name: ['', [Validators.required]],
      edition: ['', [Validators.required, ]],
      redni: ['', [Validators.required, ]],       
      comic: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      own: ['', [Validators.required]]
    })
  }



  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getComic(id:any) {
    this.apiService.getComic(id).subscribe(data => {
      this.editForm.setValue({   
        name: data['name'],
        redni: data['redni'],
        edition: data['edition'],
        comic: data ['comic'],   
        publisher: data['publisher'],
        own: data['own'],

      });
    });
  }

  updateComic() {
    this.editForm = this.fb.group({    
      name: ['', [Validators.required]],
      edition: ['', [Validators.required, ]],
      redni: ['', [Validators.required, ]], 
      comic: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      own: ['', [Validators.required]]
    })
  }
  
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateComic(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
   
    }
  }

}