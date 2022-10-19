import * as Bootstrap from 'bootstrap';
import { ColorSchemeService } from 'src/app/color-scheme.service';
import { Goat } from 'src/app/goat.interface';
import { MetaService } from 'src/app/meta.service';

import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { does } from '../goats.json';



declare const bootstrap: typeof Bootstrap;

@Component({
  selector: 'app-does',
  templateUrl: './does.component.html',
  styleUrls: ['./does.component.scss']
})
export class DoesComponent implements OnInit, OnDestroy, AfterViewInit {
  public does: Goat[] = does;
  public doe?: Goat;

  constructor(public colorScheme: ColorSchemeService, private activatedRoute: ActivatedRoute, private metaService: MetaService, private meta: Meta, private router: Router) { }
  @ViewChild("modal") modal!: ElementRef;
  ngAfterViewInit(): void {
    if (this.doe) {
      const myModalAlternative = new bootstrap.Modal(this.modal.nativeElement, { focus: false });
      myModalAlternative.show();
      this.modal.nativeElement.addEventListener('hidden.bs.modal', () => {
        this.router.navigate(['does/senior/']);
      });

    }
  }
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
