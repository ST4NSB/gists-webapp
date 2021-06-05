import { Injectable } from '@angular/core';
import { GistDetailModel } from './models/GistDetailModel';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public gistDetailSharedData: GistDetailModel;
  
  constructor() { }
}
