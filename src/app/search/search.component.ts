import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchText: string;

  constructor() { }

  ngOnInit(): void {
    this.searchText = '';
  }

  GetListOfGists() {
    console.log(this.searchText);
  }


}
