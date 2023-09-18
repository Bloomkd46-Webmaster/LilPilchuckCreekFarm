import { Component } from '@angular/core';

import app from '../app.json';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public app = app;

  constructor() { }



}
