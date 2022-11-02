import { Injectable } from '@angular/core';

import images from '../assets/map.json';
import { Goat } from './goat.interface';



@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  find(goat: Goat): string[] | undefined {
    return images.children.find(child => child.name === goat.nickname)?.children.map(image => image.path);
  }
}
