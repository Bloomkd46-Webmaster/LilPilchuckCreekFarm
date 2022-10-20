import * as Bootstrap from 'bootstrap';
import { ColorSchemeService } from 'src/app/color-scheme.service';
import { Goat } from 'src/app/goat.interface';
import { MetaService } from 'src/app/meta.service';

import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import goats from '../goats.json';



declare const bootstrap: typeof Bootstrap;

@Component({
  selector: 'app-does',
  templateUrl: './does.component.html',
  styleUrls: ['./does.component.scss']
})
export class DoesComponent {
  public does: Goat[] = goats.does;

  constructor(public colorScheme: ColorSchemeService, private activatedRoute: ActivatedRoute, private metaService: MetaService, private meta: Meta, private router: Router) { }

}
