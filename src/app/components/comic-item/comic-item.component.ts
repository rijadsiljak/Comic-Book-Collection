import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit,EventEmitter,Output } from '@angular/core';
import { Comic } from 'src/app/Comic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comic-item',
  templateUrl: './comic-item.component.html',
  styleUrls: ['./comic-item.component.css']
})
export class ComicItemComponent implements OnInit {


  @Input() comic?:Comic;

  @Output() onToggleComicOwn: EventEmitter<Comic> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onToggle(comic?: Comic | undefined) {
    this.onToggleComicOwn.emit(comic);
  }

}
