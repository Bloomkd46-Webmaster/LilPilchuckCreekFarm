import { ColorSchemeService } from 'src/app/color-scheme.service';
import { Goat } from 'src/app/goat.interface';

import { Component } from '@angular/core';

import does from './junior-does.json';



@Component({
  selector: 'app-junior-does',
  templateUrl: './junior-does.component.html',
  styleUrls: ['./junior-does.component.scss']
})
export class JuniorDoesComponent {
  public does: Goat[] = does.goats;

  constructor(public colorScheme: ColorSchemeService) { }
}
