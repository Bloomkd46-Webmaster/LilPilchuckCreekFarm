import { CookieService } from 'ngx-cookie-service';
import { ColorSchemeService } from 'src/app/color-scheme.service';

import { Component, OnInit } from '@angular/core';

import { Goat, GoatService } from '../goat.service';


@Component({
  selector: 'app-does',
  templateUrl: './does.component.html',
  styleUrls: ['./does.component.scss']
})
export class DoesComponent implements OnInit {
  public does?: Goat[];
  /*public get does(): Goat[] {
    return this.cookieService.check('Does') ? JSON.parse(this.cookieService.get('Does')) : [];
  }
  public set does(does: Goat[]) {
    this.cookieService.set('Does', JSON.stringify(does));
  }*/
  constructor(public colorScheme: ColorSchemeService, private goatService: GoatService, private cookieService: CookieService) { }
  ngOnInit(): void {
    if (this.cookieService.check('Does')) {
      this.does = JSON.parse(this.cookieService.get('Does'));
    } else {
      const does = this.goatService.getDoes();
      setTimeout(() => does.then(does => {
        this.does = does;
        this.cookieService.set('Does', JSON.stringify(does));
      }), 1500);
    }
  }
}
