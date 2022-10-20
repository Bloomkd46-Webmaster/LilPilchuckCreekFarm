import * as Bootstrap from 'bootstrap';

import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ColorSchemeService } from '../color-scheme.service';
import { Goat } from '../goat.interface';
import goats from '../goats.json';
import { MetaService } from '../meta.service';



declare const bootstrap: typeof Bootstrap;
@Component({
  selector: 'app-goat-modal',
  templateUrl: './goat-modal.component.html',
  styleUrls: ['./goat-modal.component.scss']
})
export class GoatModalComponent implements OnInit, AfterViewInit, OnDestroy {
  public does: Goat[] = goats.does;
  public bucks: Goat[] = goats.bucks;
  public goat?: Goat;

  @Input() title?: string;
  @Input() noIndex?: boolean;
  constructor(public colorScheme: ColorSchemeService, private activatedRoute: ActivatedRoute, private metaService: MetaService, private meta: Meta, private router: Router) { }

  ngOnInit(): void {
    this.goat = this.does.find(doe => doe.nickname === this.activatedRoute.snapshot.paramMap.get("doe")) ||
      this.bucks.find(buck => buck.nickname === this.activatedRoute.snapshot.paramMap.get("buck"));

    //    const specificDoe: boolean = this.activatedRoute.snapshot.paramMap.get("doe") !== null;
    //    const specificBuck: boolean = this.activatedRoute.snapshot.paramMap.get("buck") !== null;

    if (this.goat/*specificDoe || specificBuck*/) {
      console.log(this.goat);
      //this.metaService.updateKeywords(['News', 'Post', 'Blog', ...(this.post.categories ?? [])]);
      this.metaService.updateTitle(this.title ? `${this.goat.nickname} · ${this.title}` : this.goat.nickname);
      this.goat.description !== undefined ? this.metaService.updateDescription(this.goat.description) : undefined;
      if (this.noIndex) this.meta.addTag({ name: 'robots', content: 'NOINDEX' });
    } else {
      this.meta.addTag({ name: 'robots', content: 'NOINDEX' });
    }
  } ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
  };
  @ViewChild("modal") modal!: ElementRef;
  ngAfterViewInit(): void {
    if (this.goat) {
      const myModalAlternative = new bootstrap.Modal(this.modal.nativeElement);
      myModalAlternative.show();
      this.modal.nativeElement.addEventListener('hidden.bs.modal', () => {
        this.meta.removeTag('name="robots"');
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      });

    }
  }
}
