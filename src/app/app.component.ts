import { filter, map, mergeMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import app from './app.json';
import { ColorSchemeService } from './color-scheme.service';
import { GoatService } from './goat.service';
import { MetaService } from './meta.service';


declare const gtag: Function;
//@ts-expect-error
declare var window: { lastScroll: number; } & typeof window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  app = app;
  constructor(public colorScheme: ColorSchemeService, public router: Router, private metaService: MetaService, private activatedRoute: ActivatedRoute, private goatService: GoatService) { }
  public forSale = 0;
  /**
   * Update meta's and add route change listeners
   */
  ngOnInit(): void {
    /*
        <!-- Google tag (gtag.js) -->
    <script async="true" src="https://www.googletagmanager.com/gtag/js?id=G-XSEKHTV26P"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-XSEKHTV26P', { send_page_view: false });
    </script>
    */
    if (app.analytics) {
      const script1 = document.createElement('script');
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${app.analytics}`;
      script1.async = true;
      const script2 = document.createElement('script');
      script2.innerHTML =
        `window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${app.analytics}', { send_page_view: false });`;
      document.head.appendChild(script1);
      document.head.appendChild(script2);
    }
    if (app.clarity) {
      const script = document.createElement('script');
      script.innerHTML =
        `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${app.clarity}");`;
      document.head.appendChild(script);
    }

    window.addEventListener("scroll", () => {
      window.lastScroll = window.scrollY;
    });
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
    if (app.forSale) {
      this.goatService.getForSale().then(goats => this.forSale = [...goats.does, ...goats.bucks, ...goats.pets].filter(goat => !goat.status).length);
    }
    Promise.all([
      this.goatService.getDoes, this.goatService.getBucks, this.goatService.getExternals, app.pets ? this.goatService.getPets : undefined, app.kiddingSchedule ? this.goatService.getKiddingSchedule() : undefined, app.blog ? this.goatService.getBlog() : undefined
    ].filter(promise => !!promise)).then(() => console.log('Preloaded assets')).catch(err => console.error('Failed to preload asset with error:', err));
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
  //@ViewChild("doesDropdown") programsDropdown!: ElementRef;
  /**
   * Close the navbar dropdowns if necessary
   */
  closeDropdown() {
    //const nestedDropdown = this.fllDropdown.nativeElement;
    //nestedDropdown?.classList.contains('show') ? nestedDropdown?.click() : undefined;
    //const dropdown = this.programsDropdown.nativeElement;
    //dropdown?.classList.contains('show') ? dropdown?.click() : undefined;
  }
}
