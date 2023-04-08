import { Component, OnInit } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { Goat, GoatService, KiddingSchedule } from '../goat.service';


@Component({
  selector: 'app-kidding-schedule',
  templateUrl: './kidding-schedule.component.html',
  styleUrls: ['./kidding-schedule.component.scss']
})
export class KiddingScheduleComponent implements OnInit {
  public kiddingSchedule?: KiddingSchedule[] = [];
  public goats: Goat[] = [];
  constructor(public colorScheme: ColorSchemeService, private goatService: GoatService) { }
  ngOnInit(): void {
    this.goatService.getKiddingSchedule().then(data => {
      this.kiddingSchedule = data;
      const goats: Goat[] = [];
      for (const breeding of data) {
        goats.includes(breeding.dam) ? undefined : goats.push(breeding.dam);
        goats.includes(breeding.sire) ? undefined : goats.push(breeding.sire);
      }
      this.goats = goats;
      console.log(this.goats);
    });
    setTimeout(() => this.kiddingSchedule?.length ? undefined : this.kiddingSchedule = undefined, 100);
  }

}
