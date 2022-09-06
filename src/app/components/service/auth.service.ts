import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Subject, throwError} from "rxjs";

export interface IFbAuthResponse {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}


export interface User {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly  url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzcN-1cjF3tuUw57M7KSL0Vj7wNGGgQSA'
  public error$=new Subject<string>()

  constructor(private http:HttpClient) { }

  login(user:User){
    return this.http.post(`${this.url}`,user).pipe(
      catchError(this.handleError.bind(this))
    )
  }

    logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  get token(): string | null {
    const expToken = localStorage.getItem('fb-token-exp')
    if (expToken) {
      const expDate = new Date(expToken)
      if (new Date() > expDate) {
        this.logout()
        return null
      }
    }
    return localStorage.getItem('fb-token1')
  }

  private setToken(response: IFbAuthResponse | null) {
    if (response) {
      const timeNow = new Date().getTime()
      const expDate = new Date(timeNow + +response.expiresIn * 1000)
      localStorage.setItem('fb-token1', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
      console.log('setToken', expDate)
    } else {
      localStorage.clear()
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.log('hh')
    const {message} = error.error.error

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid Email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid Password')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found')
        break
    }

    if (message) {
      console.log(message)
    }
    return throwError(()=>error)
  }

}
