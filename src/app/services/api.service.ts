import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';


export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;

}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})

/*
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;

}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}
*/

export class ApiService {

  private token: string;
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }


  // create a comic

  createComic(data: any): Observable<any> {

    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )

  }

  //create a user

  createUser({ data }: { data: any; }): Observable<any> {

    let url = `${this.baseUri}/create-user`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )

  }

  // Get all comics lists
  getComics(pageIndex, pageSize) {
    return this.http.get(`${this.baseUri}`, { params: { pageIndex: pageIndex, pageSize: pageSize } });
  }

  private request(method: 'post' | 'get', type: 'login' | 'register' | 'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`${this.baseUri}/${type}`, user);
    } else {
      base = this.http.get(`${this.baseUri}/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    const request =

      base.pipe(
        map((data: TokenResponse) => {
          if (data.token) {
            this.saveToken(data.token);
          }
          return data;
        })
      );

    return request;
  }
  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  // list all comics
  listComics() {
    let url = `${this.baseUri}/list`;
    return this.http.get(url)
  }

  // Get all users lists
  getUsers() {
    const url = `${this.baseUri}/user-list`;
    return this.http.get(url)
  }
  getOwnedComics() {
    const url = `${this.baseUri}/owned`;
    return this.http.get(url)
  }
  // Get comic by ID
  getComic(id: any): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateComicOwn(id: any ): Observable<any> {
    let url = `${this.baseUri}/wish/${id}`;
    return this.http.put(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt))

  }

addComicOwntoUser(id: any, data: any ): Observable<any> {
    let url = `${this.baseUri}/own/${id}`;
    return this.http.put(url, {data:data}, { headers: this.headers }).pipe(
      catchError(this.errorMgmt))

  }

  // Update comic
  updateComic(id: any, data: any): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete comic
  deleteComic(id: any): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }


  // Delete user
  deleteUser(id: any): Observable<any> {
    let url = `${this.baseUri}/delete-user/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
