import { Component, OnInit } from '@angular/core';
import { GistService } from '../gist.service';
import { GistDetailModel } from '../models/GistDetailModel';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchText: string;
  public gistList: GistDetailModel[];

  constructor(private gistService: GistService) { }

  ngOnInit(): void {
    this.searchText = '';
  }

  public GetListOfGists() {
    console.log(this.searchText);

    this.gistService.getListOfGists(this.searchText).subscribe(res => {
      this.gistList = res;
      console.log(this.gistList[1].files[0].filename);
    });


  }


}
