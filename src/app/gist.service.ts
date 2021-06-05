import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GistDetailModel } from './models/GistDetailModel';

@Injectable({
  providedIn: 'root'
})
export class GistService {

  constructor(private httpClient: HttpClient) { }

  public getListOfGists(username: string) : Observable<Response>{
    return this.httpClient.get<Response>('https://api.github.com/users/' + username + '/gists');
  }



}
