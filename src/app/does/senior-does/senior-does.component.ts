import { ColorSchemeService } from 'src/app/color-scheme.service';
import { Goat } from 'src/app/goat.interface';
import { MetaService } from 'src/app/meta.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import does from './senior-does.json';



@Component({
  selector: 'app-senior-does',
  templateUrl: './senior-does.component.html',
  styleUrls: ['./senior-does.component.scss']
})
export class SeniorDoesComponent implements OnInit, OnDestroy {
  public does: Goat[] = does.goats;
  public doe?: Goat;

  constructor(public colorScheme: ColorSchemeService, private activatedRoute: ActivatedRoute, private metaService: MetaService, private meta: Meta) { }
  ngOnInit(): void {
    const specificDoe: boolean = this.activatedRoute.snapshot.paramMap.get("doe") !== null;
    if (specificDoe) {
      this.doe = this.does.find(doe => doe.nickname === this.activatedRoute.snapshot.paramMap.get("doe"));
      if (this.doe) {
        console.log(this.doe);
        //this.metaService.updateKeywords(['News', 'Post', 'Blog', ...(this.post.categories ?? [])]);
        this.metaService.updateTitle(this.doe.nickname);
        this.doe.description !== undefined ? this.metaService.updateDescription(this.doe.description) : undefined;
      } else {
        this.meta.addTag({ name: 'robots', content: 'NOINDEX' });
      }
    }
  }
  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
  }
}
