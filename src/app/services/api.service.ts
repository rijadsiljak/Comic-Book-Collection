import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpHeaderResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  baseUri:string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

// create a comic

createComic(data:any): Observable<any> {

  let url=`${this.baseUri}/create`;
  return this.http.post(url, data)
    .pipe(
      catchError(this.errorMgmt)
    )

 }

 //create a user

 createUser({ data }: { data: any; }): Observable<any> {

  let url=`${this.baseUri}/create-user`;
  return this.http.post(url, data)
    .pipe(
      catchError(this.errorMgmt)
    )

 }

  // Get all comics lists
  getComics(pageIndex,pageSize) {
    return this.http.get(`${this.baseUri}`,{params:{pageIndex: pageIndex,pageSize: pageSize}});
  }

    // Get all users lists
    getUsers() {
      const url= `${this.baseUri}/user-list`;
      return this.http.get(url)
    }

  getOwnedComics()  {
    const url= `${this.baseUri}/owned`;
    return this.http.get(url)
  }
  // Get comic by ID
  getComic(id:any): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res : any) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateComicOwn(id:any, data: any): Observable<any> {
    let url = `${this.baseUri}/wish/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt))
    
  }


  // Update comic
  updateComic(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete comic
deleteComic(id:any): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }


    // Delete user
deleteUser(id:any): Observable<any> {
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
