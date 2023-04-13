

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import images from '../assets/goats/map.json';
import { Goat } from './goat.service';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images = images;

  constructor(private http: HttpClient) {
    console.log('Fetching pre-compiled images...');
    this.http.get('/assets/goats/map.data.json').subscribe((data: any) => {
      console.log('Fetched pre-compiled images');
      Object.assign(this.images, data);
    });
  }

  find(goat: Goat): Images | undefined {
    return this.images.children.find(child => child.name === goat.nickname)?.children;//.map(image => image.path);
  }

  extractDisplay(images: Images): Image {
    return images.find(image => image.name.startsWith('display')) ?? images[0];
  }
}
export type Images = Image[];
export interface Image {
  path: string;
  name: string;
  children?: Images;
}
