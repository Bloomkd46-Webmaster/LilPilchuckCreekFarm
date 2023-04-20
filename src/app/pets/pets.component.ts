import { Component } from '@angular/core';

import { GoatService, Pet } from '../goat.service';


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent {
  public pets?: Pet[] = [];
  constructor(private goatService: GoatService) { }
  ngOnInit(): void {
    this.goatService.getPets().then(pets => this.pets = pets);
    setTimeout(() => this.pets?.length ? undefined : this.pets = undefined, 100);
  }
}
