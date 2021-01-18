import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VimeoService {

  constructor(private http:HttpClient) {}

  getVideos(user) {
      return this.http.get('https://vimeo.com/api/v2/'+user+'/videos.json');
  }

  getEmbedLink(url) {
    return this.http.get('https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/76979871');

  }

  getAlbums(user) {
      return this.http.get('https://vimeo.com/api/v2/'+user+'/albums.json');
  }

}