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
  public image?: string;
  /** The goat to display */
  @Input() goat!: Partial<Goat> & Pick<Goat, 'nickname' | 'name' | 'description'>;
  constructor(public colorScheme: ColorSchemeService, public imageService: ImageService) { }

  ngOnInit() {
    this.imageService.extractDisplay(this.goat.nickname).then(image => this.image = image);
  }
}
