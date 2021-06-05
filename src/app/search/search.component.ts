import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GistService } from '../gist.service';
import { GistDetailModel } from '../models/GistDetailModel';
import { SharedService } from '../shared.service';

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
  public lastInputName: string;

  constructor(private gistService: GistService,
              private readonly router: Router,
              private formBuilder: FormBuilder,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.userSearched = false;
  }

  public getListOfGists() : void {
    let name = this.searchForm.get('text')?.value;
    this.gistService.getListOfGists(name).subscribe(res => {
      this.gistList = res;
      this.userSearched = true;
      this.lastInputName = name;
    }, (errrr) => {
      this.userSearched = true;
    });
  }

  public redirectToGistDetail(item: GistDetailModel) : void {
    this.sharedService.gistDetailSharedData = item;
    this.router.navigate(['/GistDetail']);
  }
}
