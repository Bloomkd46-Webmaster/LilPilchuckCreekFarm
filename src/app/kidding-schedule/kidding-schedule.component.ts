import { Component } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import goats from '../goats.json';
import KiddingSchedule from './kidding-schedule.json';



@Component({
  selector: 'app-kidding-schedule',
  templateUrl: './kidding-schedule.component.html',
  styleUrls: ['./kidding-schedule.component.scss']
})
export class KiddingScheduleComponent {
  public kiddingSchedule = KiddingSchedule.map(schedule => { return { exposed: schedule.exposed, dam: goats.does.find(doe => doe.registeredName == schedule.dam)!, sire: goats.bucks.find(buck => buck.registeredName == schedule.sire)!, kidding: schedule.kidding }; });

  constructor(public colorScheme: ColorSchemeService) { }

}
