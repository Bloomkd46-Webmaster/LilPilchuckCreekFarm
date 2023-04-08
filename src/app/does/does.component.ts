import { ColorSchemeService } from 'src/app/color-scheme.service';

import { Component, OnInit } from '@angular/core';

import { Goat, GoatService } from '../goat.service';


@Component({
  selector: 'app-does',
  templateUrl: './does.component.html',
  styleUrls: ['./does.component.scss']
})
export class DoesComponent implements OnInit {
  public does?: Goat[] = [];
  constructor(public colorScheme: ColorSchemeService, private goatService: GoatService) { }
  ngOnInit(): void {
    this.goatService.getDoes().then(does => this.does = does);
    setTimeout(() => this.does?.length ? undefined : this.does = undefined, 100);
  }
}
