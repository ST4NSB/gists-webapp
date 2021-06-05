import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { GistDetailModel } from '../models/GistDetailModel';

@Component({
  selector: 'app-gist-detail',
  templateUrl: './gist-detail.component.html',
  styleUrls: ['./gist-detail.component.css']
})
export class GistDetailComponent implements OnInit {
  public objectDetail: GistDetailModel | null;

  constructor(private route: ActivatedRoute, private location: Location) { 
    this.route.queryParams.subscribe(params => {
      this.objectDetail = params['objectHash'];
      console.log(this.objectDetail?.filename);
  });
  }

  ngOnInit(): void {
  }

  public backClicked() : void {
    this.location.back();
  }

}
