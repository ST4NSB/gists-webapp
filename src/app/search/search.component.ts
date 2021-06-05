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

  public redirectToGistDetail(hash: GistDetailModel | null) : void {

    hash = new GistDetailModel();
    hash.filename = "test.js";
    hash.description = "some desc";
    hash.languagetag = "javascript";
    hash.rawurl = "https://gist.githubusercontent.com/ST4NSB/8009d9b6a2805b73c64362726dae17b1/raw/182063a9c6c5b23f4c4c94ce33c626838aadcec3/test.js";

    console.log("from red: " + hash.id);

    this.sharedService.gistDetailSharedData = hash;
    //this.sharedService.userSearched = this.lastInputName; // DECOMMENT THIS FAST
    this.sharedService.userSearched = "ST4NSB";
    this.router.navigate(['/GistDetail']);
  }
}
