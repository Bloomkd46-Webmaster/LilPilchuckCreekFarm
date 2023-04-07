import { Component, OnInit } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { Goat, GoatService } from '../goat.service';


@Component({
  selector: 'app-bucks',
  templateUrl: './bucks.component.html',
  styleUrls: ['./bucks.component.scss']
})
export class BucksComponent implements OnInit {
  public bucks?: Goat[];

  constructor(public colorScheme: ColorSchemeService, private goatService: GoatService) { }
  ngOnInit(): void {
    const bucks = this.goatService.getBucks();
    setTimeout(() => bucks.then(bucks => this.bucks = bucks), 500);
  }
}
