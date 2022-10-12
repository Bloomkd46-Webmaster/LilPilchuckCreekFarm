import { Component } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import KiddingSchedule from './kidding-schedule.json';



@Component({
  selector: 'app-kidding-schedule',
  templateUrl: './kidding-schedule.component.html',
  styleUrls: ['./kidding-schedule.component.scss']
})
export class KiddingScheduleComponent {
  public kiddingSchedule = KiddingSchedule;

  constructor(public colorScheme: ColorSchemeService) { }



}
