import { Component } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { Goat } from '../goat.interface';
import bucks from './bucks.json';



@Component({
  selector: 'app-bucks',
  templateUrl: './bucks.component.html',
  styleUrls: ['./bucks.component.scss']
})
export class BucksComponent {
  public bucks: Goat[] = bucks.goats;
  constructor(public colorScheme: ColorSchemeService) { }
}
