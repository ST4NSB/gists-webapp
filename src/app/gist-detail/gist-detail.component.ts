import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { GistDetailModel } from '../models/GistDetailModel';
import { SharedService } from '../shared.service';
import { GistService } from '../gist.service';

@Component({
  selector: 'app-gist-detail',
  templateUrl: './gist-detail.component.html',
  styleUrls: ['./gist-detail.component.css']
})
export class GistDetailComponent implements OnInit {
  public gistdetail: GistDetailModel;

  constructor(private location: Location,
              private sharedService: SharedService,
              private gistService: GistService) { 
    this.gistdetail = sharedService.GistDetailSharedData;
    this.getTextFromGist();
  }

  ngOnInit(): void {
  }

  public backClicked() : void {
    this.location.back();
  }

  private getTextFromGist(): void {
    //this.gistService.getTextFromGistUrl(this.gistdetail.rawurl);
    this.gistService.getTextFromGistUrl("https://gist.githubusercontent.com/ST4NSB/8009d9b6a2805b73c64362726dae17b1/raw/182063a9c6c5b23f4c4c94ce33c626838aadcec3/test.js")
      .subscribe(res => console.log(res));
  }

}
