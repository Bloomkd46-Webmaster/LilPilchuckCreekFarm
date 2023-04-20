

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Goat } from './goat.service';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }
  private _imageMap?: ImageMap;
  getImageMap(): Promise<ImageMap> {
    if (this._imageMap) {
      console.debug('Used Image Map From Cache', this._imageMap);
      return Promise.resolve(this._imageMap);
    } else {
      return new Promise(resolve => this.http.get<ImageMap>('/assets/goats/map.json')
        .subscribe(data => {
          this._imageMap = data;
          console.debug('Loaded Image Map From Server', data);
          resolve(data);
        }));
    }
  }
  private _displayImages?: DisplayImages | null;
  getDisplayImages(): Promise<DisplayImages> {
    if (this._displayImages) {
      console.debug('Used Display Images From Cache', this._displayImages);
      return Promise.resolve(this._displayImages);
    } else {
      return new Promise(resolve => {
        if (this._displayImages === null) {
          setInterval(() => this._displayImages ? resolve(this._displayImages) : null);
        } else {
          this._displayImages = null;
          this.http.get<DisplayImages>('/assets/goats/display-images.json')
            .subscribe(data => {
              this._displayImages = data;
              console.debug('Loaded Display Images From Server', data);
              resolve(data);
            });
        }
      });
    }
  }

  async find(goat: Pick<Goat, 'nickname'>): Promise<Images | undefined> {

    return (await this.getImageMap()).children!.find(child => child.name === goat.nickname)?.children;//.map(image => image.path);
  }

  async extractDisplay(goat: string): Promise<string> {
    const displayImages = await this.getDisplayImages();
    return displayImages[Object.keys(displayImages).find(_goat => _goat === goat)!];
  }
}
export type Images = ImageMap[];
export interface ImageMap {
  path: string;
  name: string;
  children?: Images;
}
export interface DisplayImages {
  [goat: string]: string;
}
