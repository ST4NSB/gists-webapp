import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-gist-detail',
  templateUrl: './gist-detail.component.html',
  styleUrls: ['./gist-detail.component.css']
})
export class GistDetailComponent implements OnInit {
  public link: string | null;

  constructor(private route: ActivatedRoute, private location: Location) { 
    this.route.queryParams.subscribe(params => {
      this.link = params['link'];
      
  });
  }

  ngOnInit(): void {
  }

  public backClicked() {
    this.location.back();
  }

}
