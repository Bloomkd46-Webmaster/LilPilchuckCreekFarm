import { Component } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { GoatService } from '../goat.service';
import KiddingSchedule from './kidding-schedule.json';



@Component({
  selector: 'app-kidding-schedule',
  templateUrl: './kidding-schedule.component.html',
  styleUrls: ['./kidding-schedule.component.scss']
})
export class KiddingScheduleComponent {
  public kiddingSchedule = KiddingSchedule.map(schedule => { return { exposed: schedule.exposed, dam: this.goatService.does.find(doe => doe.name == schedule.dam.toUpperCase())!, sire: this.goatService.bucks.find(buck => buck.name == schedule.sire.toUpperCase())!, kidding: schedule.kidding }; });

  constructor(public colorScheme: ColorSchemeService, private goatService: GoatService) { }

}
