

import { Component, OnInit } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { ForSale, GoatService } from '../goat.service';


@Component({
  selector: 'app-for-sale',
  templateUrl: './for-sale.component.html',
  styleUrls: ['./for-sale.component.scss']
})
export class ForSaleComponent implements OnInit {
  public goats?: ForSale = { does: [], bucks: [], pets: [] };
  constructor(public colorScheme: ColorSchemeService, private goatService: GoatService) { }
  ngOnInit(): void {
    this.goatService.getForSale().then(goats => this.goats = goats);
    setTimeout(() => this.goats?.bucks.length || this.goats?.does.length || this.goats?.pets.length ? undefined : this.goats = undefined, 100);
  }
  getAllGoats() {
    return this.goats?.bucks.length || this.goats?.does.length ? [...this.goats!.does, ...this.goats!.bucks] : [];
  }
}
