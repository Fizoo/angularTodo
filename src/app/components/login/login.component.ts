import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {AuthService, User} from "../service/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  form: FormGroup
  aSub:Subscription
  bSub:Subscription
  errorText: string

  constructor(private auth: AuthService,
              private router: Router
              ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(6)]),
      checkbox: new FormControl(true,)
    })

   this.bSub= this.auth.error$.subscribe(el=>this.errorText=el)
  }


  onSubmit() {
    let user:User={
      email:this.form.value.email,
      password:this.form.value.password
    }
    this.aSub=this.auth.login(user).subscribe(()=>{
      this.router.navigate(['/'])
    })
  }

  get email() {
    return this.form.controls['email']
  }

  get password() {
    return this.form.controls['password']
  }


  ngOnDestroy(): void {
    if(this.aSub){
        this.aSub.unsubscribe()
    }
    if(this.bSub){
      this.bSub.unsubscribe()
    }
  }
}
