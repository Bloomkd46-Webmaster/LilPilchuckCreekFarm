import { ColorSchemeService } from 'src/app/color-scheme.service';

import { Component } from '@angular/core';

import { Goat, GoatService } from '../goat.service';



@Component({
  selector: 'app-does',
  templateUrl: './does.component.html',
  styleUrls: ['./does.component.scss']
})
export class DoesComponent {
  public does: Goat[] = this.goatService.does;

  constructor(public colorScheme: ColorSchemeService, private goatService: GoatService) { }

}
