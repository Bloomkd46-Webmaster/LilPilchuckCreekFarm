import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { routes } from '../app-routing.module';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(public activatedRoute: ActivatedRoute, public router: Router) { }
  ngOnInit() {
    routes.forEach(route => {
      if (route.path?.toLowerCase() === this.activatedRoute.snapshot.url[0].path.toLowerCase()) {
        console.log('Found Correct Path');
        this.router.navigate([route.path]);
      }
    });
  }
}
