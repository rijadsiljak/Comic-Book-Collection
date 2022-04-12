import { Injectable } from '@angular/core';
import { Comic } from '../Comic';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ComicService {

  private apiUrl = 'http://localhost:5000/comics'

  constructor(private http: HttpClient,

  ) { }
  // old methods
  getComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>(this.apiUrl);
  }

  deleteComic(comic: Comic): Observable<Comic> {
    const url = `${this.apiUrl}/${comic.id}`;
    return this.http.delete<Comic>(url);
  }


  updateComicOwn(comic: Comic): Observable<Comic> {
    const url = `${this.apiUrl}/${comic.id}`;
    return this.http.put<Comic>(url, comic, httpOptions);
  }




  getComic(id: number | string) {
    return this.getComics().pipe(
      map((comics: Comic[]) => comics.find(comic => comic.id === +id)!)
    );
  }




  //new methods

  //POST
  create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data).pipe(catchError(this.handleError))
  }

  //GET
  list() {
    return this.http.get(`${this.apiUrl}`);

  }

  //UPDATE

  update(id:any, data:any): Observable<any> {


    let API_URL = `${this.apiUrl}`;
    return this.http.delete(API_URL).pipe(catchError(this.handleError))
  }



  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };


}
