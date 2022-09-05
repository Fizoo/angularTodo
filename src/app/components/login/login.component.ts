import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {AuthService, User} from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  constructor(private auth: AuthService,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(6)]),
      checkbox: new FormControl(true,)
    })
  }

  get email() {
    return this.form.controls['email']
  }

  get password() {
    return this.form.controls['password']
  }

  onSubmit() {
    let user:User={
      email:this.form.value.email,
      password:this.form.value.password
    }
    this.auth.login(user).subscribe(()=>{
      this.router.navigate(['/'])
    })
    console.log(this.form.value)
  }
}
