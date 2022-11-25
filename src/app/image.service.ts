

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import images from '../assets/goats/map.json';
import { Goat } from './goat.interface';



@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images = images;

  constructor(private http: HttpClient) {
    console.log('Fetching pre-compiled images...');
    this.http.get('assets/images/map.data.json').subscribe((data: any) => {
      console.log('Fetched pre-compiled images');
      this.images = data;
    });
  }

  find(goat: Goat) {
    return this.images.children.find(child => child.name === goat.nickname)?.children;//?.map(image => image.path);
  }

  extractDisplay(images: Images): Images[number] {
    return images.find(image => image.name.startsWith('display')) ?? images[0];
  }
}
export type Images = ({
  path: string;
  name: string;
  children?: Images;
})[];
