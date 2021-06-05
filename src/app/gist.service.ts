import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GistDetailModel } from './models/GistDetailModel';

@Injectable({
  providedIn: 'root'
})
export class GistService {
  private link: string = 'https://localhost:44314/gist/getcuratedgists/';

  constructor(private httpClient: HttpClient) { }

  public getListOfGists(username: string) : Observable<GistDetailModel[]>{
    return this.httpClient.get<GistDetailModel[]>(this.link + username);
  }

  public getTextFromGistUrl(url: string) : Observable<string> {
    // apparently we need to set the headers to text and then
    // we should make resonseType as json
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html',
        'Content-Type': 'text/plain; charset=utf-8'
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.get<string>(url, httpOptions);
  }
}
