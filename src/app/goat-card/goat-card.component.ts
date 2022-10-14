import { Component, Input } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { Goat } from '../goat.interface';



@Component({
  selector: 'app-goat-card',
  templateUrl: './goat-card.component.html',
  styleUrls: ['./goat-card.component.scss']
})
export class GoatCardComponent {

  @Input() goat!: Goat;
  constructor(public colorScheme: ColorSchemeService) { }
}
