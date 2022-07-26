import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UiServiceService {
  private showAddComic: boolean = true;
  private subject = new Subject<any>();

  constructor() {}

  toggleAddComic(): void {
    this.showAddComic = !this.showAddComic;
    this.subject.next(this.showAddComic);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

}
