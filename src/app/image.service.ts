

import { Injectable } from '@angular/core';

import images from '../assets/goats/map.json';
import { Goat } from './goat.interface';



@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  find(goat: Goat) {
    return images.children.find(child => child.name === goat.nickname)?.children;//?.map(image => image.path);
  }
}
