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
  public userName: string;
  public textLines: string[];

  constructor(private location: Location,
              private sharedService: SharedService,
              private gistService: GistService) { 
    this.gistdetail = sharedService.gistDetailSharedData;
    this.userName = sharedService.userSearched;
    console.log(this.userName);
    this.getTextFromGist();
  }

  ngOnInit(): void {
  }

  public backClicked() : void {
    this.location.back();
  }

  private getTextFromGist(): void {
    this.gistService.getTextFromGistUrl(this.gistdetail.rawurl)
      .subscribe(res => {
        this.textLines = res.split(/\n/g); // split so we have all lines at "\n"
    });
  }
}
