import { ColorSchemeService } from 'src/app/color-scheme.service';
import { Goat } from 'src/app/goat.interface';

import { Component } from '@angular/core';

import does from './senior-does.json';



@Component({
  selector: 'app-senior-does',
  templateUrl: './senior-does.component.html',
  styleUrls: ['./senior-does.component.scss']
})
export class SeniorDoesComponent {
  public does: Goat[] = does.goats;

  constructor(public colorScheme: ColorSchemeService) { }

}
