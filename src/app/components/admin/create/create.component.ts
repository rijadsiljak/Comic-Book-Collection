import { Component, OnInit,NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  submitted = false;
  comicForm!: FormGroup;


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService) 
    { this.mainForm();}

  ngOnInit(): void {
  }
  mainForm() {
   
    this.comicForm = this.fb.group({
      name: ['', [Validators.required]],
      edition: ['', [Validators.required, ]],
      ordinal: ['', [Validators.required, ]],
      cover: ['', [Validators.required]],
      own: ['', [Validators.required, ]]
    });

  }

  get myForm(){
    return this.comicForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.comicForm.valid) {
      return false;
    } else {
      return this.apiService.createComic(this.comicForm.value).subscribe({
        complete: () => {
          console.log('Comic successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  }
