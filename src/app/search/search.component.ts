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

  // this returns a hash code for a number (example used for programming language background-color tag) 
  public getBackgroundColor(str: string) : string{
    const value = this.hashCode(str);
    var c = (value & 0x00FFFFFF).toString(16).toUpperCase();

    return "#" + "00000".substring(0, 6 - c.length) + c;
  }

  // this sets quite the opposite (look-good opposite) of the font color for the tag,
  // set with background-color by the getBackgroundColor() method from above
  public getFontColor(bkColor: string) : string {
    let color = bkColor.substring(1);

    // I assume that this will look good for all cases :D
    if (color >= 'AAAAAA') {
      return "#000000";
    }
    else {
      return "#ffffff"; 
    }
  }

  private hashCode(str: string) : number {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  } 
}
