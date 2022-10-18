import { Component, Input } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { Goat } from '../goat.interface';



@Component({
  selector: 'app-goat',
  templateUrl: './goat.component.html',
  styleUrls: ['./goat.component.scss']
})
export class GoatComponent {
  /** The goat to display */
  @Input() goat!: Goat;
  constructor(public colorScheme: ColorSchemeService) { }
}
