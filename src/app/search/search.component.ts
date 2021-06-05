import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private gistService: GistService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.searchText = '';
  }

  public getListOfGists() {
    console.log(this.searchText);

    this.gistService.getListOfGists(this.searchText).subscribe(res => {
      this.gistList = res;
    });
  }

  public redirectToGistDetail(linkParam: string = "what is up") {
    this.router.navigate(['/GistDetail'], { queryParams: { link: "https://gist.githubusercontent.com/ST4NSB/8009d9b6a2805b73c64362726dae17b1/raw/182063a9c6c5b23f4c4c94ce33c626838aadcec3/test.js"} });
  }


}
