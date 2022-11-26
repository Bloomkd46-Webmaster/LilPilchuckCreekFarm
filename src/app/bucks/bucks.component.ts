import { Component } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { Goat, GoatService } from '../goat.service';



@Component({
  selector: 'app-bucks',
  templateUrl: './bucks.component.html',
  styleUrls: ['./bucks.component.scss']
})
export class BucksComponent {
  public bucks: Goat[] = this.goatService.bucks;
  constructor(public colorScheme: ColorSchemeService, private goatService: GoatService) { }
}
