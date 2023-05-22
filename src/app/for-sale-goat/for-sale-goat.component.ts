import { Component, Input, OnInit } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { ForSaleGoat } from '../goat.service';
import { ImageService } from '../image.service';


@Component({
  selector: 'app-for-sale-goat',
  templateUrl: './for-sale-goat.component.html',
  styleUrls: ['./for-sale-goat.component.scss']
})
export class ForSaleGoatComponent implements OnInit {
  public image?: string;
  /** The goat to display */
  @Input() goat!: ForSaleGoat;
  constructor(public colorScheme: ColorSchemeService, public imageService: ImageService) { }

  ngOnInit() {
    this.imageService.extractDisplay(this.goat.nickname).then(image => this.image = image);
  }
}
