import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gist-detail',
  templateUrl: './gist-detail.component.html',
  styleUrls: ['./gist-detail.component.css']
})
export class GistDetailComponent implements OnInit {
  public link: string | null;

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.link = params['link'];
      console.log(this.link); // Print the parameter to the console. 
  });
  }

  ngOnInit(): void {
  }

}
