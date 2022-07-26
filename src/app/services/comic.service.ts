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


  updateComics(comic: Comic): Observable<Comic> {
    const url = `${this.apiUrl}/${comic.id}`;
    return this.http.put<Comic>(url, comic, httpOptions);  
  }

  addComic(comic: Comic): Observable<Comic> {
      return this.http.post<Comic>(this.apiUrl, comic, httpOptions);
    }

  getComic(id: number | string) {
    return this.getComics().pipe(
      map((comics: Comic[]) => comics.find(comic => comic.id === +id)!)
    );
  }

}
