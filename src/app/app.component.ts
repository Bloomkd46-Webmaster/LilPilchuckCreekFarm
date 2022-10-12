import { filter, map, mergeMap } from 'rxjs';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { ColorSchemeService } from './color-scheme.service';
import { MetaService } from './meta.service';



declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public colorScheme: ColorSchemeService, public router: Router, private metaService: MetaService, private activatedRoute: ActivatedRoute) { }
  /**
   * Update meta's and add route change listeners
   */
  ngOnInit(): void {
    //gtag('config', 'G-CCJFLF4RHZ', { 'color_scheme': this.colorScheme.darkMode ? 'dark' : 'light' });
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) { route = route.firstChild; }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)).subscribe((data) => {
          console.log(data);
          this.metaService.updateTitle(data['title'] ?? '');
          this.metaService.updateDescription(data['description'] ?? '');
          this.metaService.updateKeywords(data['keywords'] ?? []);
        });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.closeDropdown();
        console.log('Route change detected');
      }
      if (event instanceof NavigationEnd) {
        /** Upload Analytics */
        gtag('event', 'page_view', {
          page_path: event.urlAfterRedirects
        });
        console.debug(event);
      }
      if (event instanceof NavigationError) {
        console.error(event.error);
      }
    });
  }
  /**
   * Returns wether or not a link is active
   * @param {string} link the link to test
   * @returns wether or not the {@link link} is active
   */
  routerLinkActive(link: string): boolean {
    return this.router.isActive(link, { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' });
  }
  //@ViewChild("fllDropdown") fllDropdown!: ElementRef;
  @ViewChild("doesDropdown") programsDropdown!: ElementRef;
  /**
   * Close the navbar dropdowns if necessary
   */
  closeDropdown() {
    //const nestedDropdown = this.fllDropdown.nativeElement;
    //nestedDropdown?.classList.contains('show') ? nestedDropdown?.click() : undefined;
    const dropdown = this.programsDropdown.nativeElement;
    dropdown?.classList.contains('show') ? dropdown?.click() : undefined;
  }
}
