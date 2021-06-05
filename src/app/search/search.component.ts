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

  public redirectToGistDetail(linkParam: string) {
    console.log(linkParam);
    this.router.navigate(['/GistDetail'], { queryParams: { link: linkParam}});
  }
}
