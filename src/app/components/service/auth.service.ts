import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

  constructor(private http:HttpClient) { }

  login(user:User){
    return this.http.post(`${this.url}`,user).pipe()
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

}
