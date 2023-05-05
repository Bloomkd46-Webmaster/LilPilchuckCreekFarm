

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Goat } from './goat.service';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }
  private _imageMap?: ImageMap | null;
  getImageMap(): Promise<ImageMap> {
    if (this._imageMap) {
      console.debug('Used Image Map From Cache', this._imageMap);
      return Promise.resolve(this._imageMap);
    } else {
      return new Promise(resolve => {
        if (this._imageMap === null) {
          const interval = setInterval(() => {
            if (this._imageMap) {
              console.debug('Used Image Map From Cache', this._imageMap);
              resolve(this._imageMap);
              clearInterval(interval);
            };
          });
        } else {
          this._imageMap = null;
          this.http.get<ImageMap>('/assets/goats/map.json')
            .subscribe(data => {
              this._imageMap = data;
              console.debug('Loaded Image Map From Server', data);
              resolve(data);
            });

        }
      });
    }
  }
  /*private _displayImages?: DisplayImages | null;
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
  }*/

  async find(goat: Pick<Goat, 'nickname'>): Promise<Images | undefined> {
    return (await this.getImageMap()).children!.find(child => child.name === goat.nickname)?.children;//.map(image => image.path);
  }
  private _displayImages: { [goat: string]: string | null; } = {};

  async extractDisplay(goat: string): Promise<string> {
    console.debug('Extracting Display', goat);
    const map = await this.getImageMap();
    const images = map.children!.find(_goat => _goat.name === goat)!;
    const image = images.children!.find(image => image.name.startsWith('display')) ?? (images.children ?? [])[0];;
    const goatImage = this._displayImages[goat];
    if (goatImage) {
      console.debug('Used Display Image From Cache', goat, /*goatImage*/);
      return goatImage;
    } else {
      return new Promise(resolve => {
        if (goatImage === null) {
          setInterval(() => {
            const latestGoatImage = this._displayImages[goat];
            if (latestGoatImage) {
              console.debug('Used Display Image From Cache', goat, latestGoatImage);
              resolve(latestGoatImage);
            };
          });
        } else {
          this._displayImages[goat] = null;
          this.http.get(image.path, { responseType: 'blob' })
            .subscribe(data => {
              const url = URL.createObjectURL(data);
              this._displayImages[goat] = url;//`data:image/jpeg;base64,${Buffer.from(data, 'base64url')}`;
              console.debug('Loaded Display Image From Server', goat, url);
              resolve(url);
            });
        }
      });
    }
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
