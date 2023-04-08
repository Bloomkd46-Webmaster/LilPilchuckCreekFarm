import { Awards } from 'adga';
import * as Bootstrap from 'bootstrap';

import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ColorSchemeService } from '../color-scheme.service';
import { ExternalGoat, Goat, GoatService } from '../goat.service';
import { ImageService } from '../image.service';
import { MetaService } from '../meta.service';


declare const bootstrap: typeof Bootstrap;
@Component({
  selector: 'app-goat-modal',
  templateUrl: './goat-modal.component.html',
  styleUrls: ['./goat-modal.component.scss']
})
export class GoatModalComponent implements OnInit, AfterViewInit, OnDestroy {
  public images?: { path: string; name: string; }[];
  public goat?: Goat;
  public parents?: { dam: ExternalGoat; damsDam: ExternalGoat; damsSire: ExternalGoat; sire: ExternalGoat; siresDam: ExternalGoat; siresSire: ExternalGoat; };
  public nickname = this.activatedRoute.snapshot.paramMap.get("doe") || this.activatedRoute.snapshot.paramMap.get("buck");

  @Input() title?: string;
  @Input() noIndex?: boolean;
  @Input() ignoreNotFound?: boolean;
  @Input() goats: Goat[] = [];
  constructor(public colorScheme: ColorSchemeService, private activatedRoute: ActivatedRoute, private metaService: MetaService, private meta: Meta, private router: Router, public imageService: ImageService, private goatService: GoatService) { }

  async setup(goat?: Goat) {
    this.goat = goat;
    if (this.goat/*specificDoe || specificBuck*/) {
      console.log(this.goat);
      //this.metaService.updateKeywords(['News', 'Post', 'Blog', ...(this.post.categories ?? [])]);
      this.metaService.updateTitle(this.title ? `${this.goat.nickname} · ${this.title}` : this.goat.nickname);
      this.goat.description !== undefined ? this.metaService.updateDescription(this.goat.description) : undefined;
      if (this.noIndex) this.meta.addTag({ name: 'robots', content: 'NOINDEX' });
      this.images = this.imageService.find(this.goat);

      this.parents = await this.goatService.getParents(this.goat);
    }/* else {
      this.meta.addTag({ name: 'robots', content: 'NOINDEX' });
    }*/
  }
  ngOnInit(): void {
    this.setup(this.goats.find(doe => doe.nickname === this.activatedRoute.snapshot.paramMap.get("doe")) ??
      this.goats.find(buck => buck.nickname === this.activatedRoute.snapshot.paramMap.get("buck")));
    /*const doe = new Promise<Goat>(resolve => this.goatService.getDoes().then(does => {
      const doe = does.find(doe => doe.nickname === this.activatedRoute.snapshot.paramMap.get("doe"));
      doe ? resolve(doe) : undefined;
    }));
    const buck = new Promise<Goat>(resolve => this.goatService.getBucks().then(bucks => {
      const buck = bucks.find(buck => buck.nickname === this.activatedRoute.snapshot.paramMap.get("buck"));
      buck ? resolve(buck) : undefined;
    }));
    Promise.race([doe, buck]).then(goat => this.setup(goat));*/
  }
  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
  };
  @ViewChild("modal") modal!: ElementRef<HTMLDivElement>;
  @ViewChild("carousel") carousel!: ElementRef<HTMLDivElement>;
  ngAfterViewInit(): void {
    if (this.goat || (this.nickname && !this.ignoreNotFound)) {
      const bsModal = new bootstrap.Modal(this.modal.nativeElement);
      bsModal.show();
      this.modal.nativeElement.addEventListener('hidden.bs.modal', () => {
        this.meta.removeTag('name="robots"');
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      });
    }
    if (this.images) {
      new bootstrap.Carousel(this.carousel.nativeElement, {
        ride: "carousel",
        interval: 2000
      });
    }
  }
  getAwards(awards: Awards['result']['items']): string {
    return awards.map(award => award.awardCode).join('; ');
  }
}
