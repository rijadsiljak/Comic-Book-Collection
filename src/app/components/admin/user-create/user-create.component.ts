import { Component, OnInit,NgZone } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  submitted = false;
  userForm!: FormGroup;


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService) 
    { this.mainForm();}

  ngOnInit(): void {
  }
  mainForm() {
   
    this.userForm = this.fb.group({
      name: [],
      surname: [],
      email: [],
      username: [],
      password: []
    });

  }

  get myForm(){
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      return false;
    } else {
      return this.apiService.createUser({ data: this.userForm.value }).subscribe({
        complete: () => {
          console.log('User successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/user-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  }
