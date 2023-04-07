import { Component, OnInit } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { GoatService, KiddingSchedule } from '../goat.service';


@Component({
  selector: 'app-kidding-schedule',
  templateUrl: './kidding-schedule.component.html',
  styleUrls: ['./kidding-schedule.component.scss']
})
export class KiddingScheduleComponent implements OnInit {
  public kiddingSchedule?: KiddingSchedule[];
  constructor(public colorScheme: ColorSchemeService, private goatService: GoatService) { }
  ngOnInit(): void {
    this.goatService.getKiddingSchedule().then(data => this.kiddingSchedule = data);
  }

}
