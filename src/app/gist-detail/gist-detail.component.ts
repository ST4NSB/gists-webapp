import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { GistDetailModel } from '../models/GistDetailModel';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-gist-detail',
  templateUrl: './gist-detail.component.html',
  styleUrls: ['./gist-detail.component.css']
})
export class GistDetailComponent implements OnInit {
  public gistdetail: GistDetailModel;

  constructor(private route: ActivatedRoute, 
              private location: Location,
              private sharedService: SharedService) { 
    this.gistdetail = sharedService.GistDetailSharedData;
    console.log("hhhh: " + this.gistdetail.id);
  }

  ngOnInit(): void {
  }

  public backClicked() : void {
    this.location.back();
  }

}
