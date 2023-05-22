import { Component, OnInit } from '@angular/core';

import { Goat, GoatService } from '../goat.service';


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
  public pets?: Goat[] = [];
  constructor(private goatService: GoatService) { }
  ngOnInit(): void {
    this.goatService.getPets().then(pets => this.pets = pets as Goat[]);
    setTimeout(() => this.pets?.length ? undefined : this.pets = undefined, 100);
  }
}
