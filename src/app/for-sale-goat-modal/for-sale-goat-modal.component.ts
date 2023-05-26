import * as Bootstrap from 'bootstrap';

import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ColorSchemeService } from '../color-scheme.service';
import { ExternalGoat, ForSaleGoat, GoatService } from '../goat.service';
import { ImageService } from '../image.service';
import { MetaService } from '../meta.service';


declare const bootstrap: typeof Bootstrap;
@Component({
  selector: 'app-for-sale-goat-modal',
  templateUrl: './for-sale-goat-modal.component.html',
  styleUrls: ['./for-sale-goat-modal.component.scss']
})
export class ForSaleGoatModalComponent implements OnInit, AfterViewInit, OnDestroy {
  public images?: { path: string; name: string; }[];
  public goat?: ForSaleGoat;
  public parents?: { dam: ExternalGoat; damsDam: ExternalGoat; damsSire: ExternalGoat; sire: ExternalGoat; siresDam: ExternalGoat; siresSire: ExternalGoat; } | null = null;
  public nickname = this.activatedRoute.snapshot.paramMap.get("doe") || this.activatedRoute.snapshot.paramMap.get("buck");

  @Input() title?: string;
  @Input() noIndex?: boolean;
  @Input() ignoreNotFound?: boolean;
  @Input() goats: ForSaleGoat[] = [];
  constructor(public colorScheme: ColorSchemeService, private activatedRoute: ActivatedRoute, private metaService: MetaService, private meta: Meta, private router: Router, public imageService: ImageService, private goatService: GoatService) { }

  async setup(goat?: ForSaleGoat) {
    console.log('Setting up for', goat);
    this.goat = goat;
    if (this.goat/*specificDoe || specificBuck*/) {
      console.log(this.goat);
      //this.metaService.updateKeywords(['News', 'Post', 'Blog', ...(this.post.categories ?? [])]);
      this.metaService.updateTitle(this.title ? `${this.goat.nickname} · ${this.title}` : this.goat.nickname);
      this.metaService.updateDescription(this.goat.description);
      if (this.noIndex) this.meta.addTag({ name: 'robots', content: 'NOINDEX' });
      this.imageService.find(this.goat).then(images => this.images = images);
    }/* else {
      this.meta.addTag({ name: 'robots', content: 'NOINDEX' });
    }*/
  }
  ngOnInit(): void {
    this.setup(this.goats.find(doe => doe.nickname.toLowerCase() === this.activatedRoute.snapshot.paramMap.get("doe")?.toLowerCase()) ??
      this.goats.find(buck => buck.nickname.toLowerCase() === this.activatedRoute.snapshot.paramMap.get("buck")?.toLowerCase()) ??
      this.goats.find(buck => buck.nickname.toLowerCase() === this.activatedRoute.snapshot.paramMap.get("pet")?.toLowerCase()));
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
}