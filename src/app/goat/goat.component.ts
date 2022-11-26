import { Component, Input, OnInit } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { Goat } from '../goat.service';
import { ImageService } from '../image.service';



@Component({
  selector: 'app-goat',
  templateUrl: './goat.component.html',
  styleUrls: ['./goat.component.scss']
})
export class GoatComponent implements OnInit {
  public image?: { path: string; name: string; };
  /** The goat to display */
  @Input() goat!: Goat;
  constructor(public colorScheme: ColorSchemeService, public imageService: ImageService) { }

  ngOnInit() {
    const images = this.imageService.find(this.goat);
    this.image = images ? images.find(image => image.name.split('.')[0] === 'Display') || images[0] : undefined;
  }
}
