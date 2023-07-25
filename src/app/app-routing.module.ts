import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog/blog.component';
import { BucksComponent } from './bucks/bucks.component';
import { DoesComponent } from './does/does.component';
import { ForSaleComponent } from './for-sale/for-sale.component';
import { HomeComponent } from './home/home.component';
import { KiddingScheduleComponent } from './kidding-schedule/kidding-schedule.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PetsComponent } from './pets/pets.component';


export const routes: Routes = [
  {
    path: '', component: HomeComponent, data: {
      title: 'Home',
      description: 'Our hobby farm is home to ADGA Registered Nigerian Dwarfs. The farm has evolved from a farm girl\'s wish to continue her dairy roots into a 4-H project with the goal of raising show-quality goats. Thanks to wonderful breed mentors we have established a solid herd we hope to learn from and build on.',
      keywords: ['Home'],
    }
  },
  { path: 'home', redirectTo: '' },
  {
    path: 'does', data: {
      title: 'Does',
      description: '',
      keywords: ['Does', 'Doe', 'Junior', 'Senior', 'Milking', 'Dry']
    }, children: [
      { path: '', component: DoesComponent },
      { path: ':doe', component: DoesComponent }
    ]
  },
  {
    path: 'bucks', data: {
      title: 'Bucks',
      description: '',
      keywords: ['Bucks', 'Buck', 'Junior', 'Senior']
    }, children: [
      { path: '', component: BucksComponent },
      { path: ':buck', component: BucksComponent }
    ]
  },
  {
    path: 'pets', data: {
      title: 'Pets',
      description: '',
      keywords: ['Pets', 'Pet']
    }, children: [
      { path: '', component: PetsComponent },
      { path: ':pet', component: PetsComponent }
    ]
  },
  {
    path: 'kidding-schedule', data: {
      title: 'Kidding Schedule',
      description: '',
      keywords: ['Kidding', 'Schedule']
    }, children: [
      { path: '', component: KiddingScheduleComponent },
      { path: ':doe', component: KiddingScheduleComponent },
      { path: ':buck', component: KiddingScheduleComponent }
    ]
  },
  {
    path: 'for-sale', data: {
      title: 'For Sale',
      description: '',
      keywords: ['For', 'Sale', 'Selling']
    }, children: [
      { path: '', component: ForSaleComponent },
      { path: ':doe', component: ForSaleComponent },
      { path: ':buck', component: ForSaleComponent },
      { path: ':pet', component: ForSaleComponent }
    ]
  }/*,
  {
    path: 'contact-us', component: ContactUsComponent, data: {
      title: 'Kidding Schedule',
      description: '',
      keywords: ['Contact', 'Us']
    }
  }*/,
  {
    path: 'blog', data: {
      title: 'Farm Blog',
      description: 'See whats happening on the farm',
      keywords: ['Blog', 'social', 'socials', 'media', 'facebook']
    }, component: BlogComponent,
  },
  {
    path: '**', component: NotFoundComponent, data: {
      title: 'Not Found'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled', scrollOffset: [0, 125], anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
