import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GistService } from '../gist.service';
import { GistDetailModel } from '../models/GistDetailModel';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public userSearched: boolean;
  public gistList: GistDetailModel[];
  public searchForm = this.formBuilder.group({
    text: '',
  });

  constructor(private gistService: GistService,
              private readonly router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userSearched = false;
  }

  public getListOfGists() : void {
    this.gistService.getListOfGists(this.searchForm.get('text')?.value).subscribe(res => {
      this.gistList = res;
      this.userSearched = true;
    }, (errrr) => {
      this.userSearched = true;
    });
  }

  public redirectToGistDetail(objectHash: GistDetailModel) : void {
    this.router.navigate(['/GistDetail'], { queryParams: { objectHash: objectHash}});
  }
}
