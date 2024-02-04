import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import app from './app.json';
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
    path: '', component: HomeComponent,
    title: 'Home' + ' · ' + app.tabTitle
    //      description: 'Our hobby farm is home to ADGA Registered Nigerian Dwarfs. The farm has evolved from a farm girl\'s wish to continue her dairy roots into a 4-H project with the goal of raising show-quality goats. Thanks to wonderful breed mentors we have established a solid herd we hope to learn from and build on.',
    //      keywords: ['Home'],
  },
  { path: 'home', redirectTo: '' },
  {
    path: 'does',
    title: 'Does' + ' · ' + app.tabTitle,
    //      description: '',
    //      keywords: ['Does', 'Doe', 'Junior', 'Senior', 'Milking', 'Dry']
    children: [
      { path: '', component: DoesComponent },
      { path: ':doe', component: DoesComponent }
    ]
  },
  {
    path: 'bucks',
    title: 'Bucks' + ' · ' + app.tabTitle,
    //      description: '',
    //      keywords: ['Bucks', 'Buck', 'Junior', 'Senior']
    children: [
      { path: '', component: BucksComponent },
      { path: ':buck', component: BucksComponent }
    ]
  },
  app.pets ? {
    path: 'pets',
    title: 'Pets' + ' · ' + app.tabTitle,
    //      description: '',
    //      keywords: ['Pets', 'Pet']
    children: [
      { path: '', component: PetsComponent },
      { path: ':pet', component: PetsComponent }
    ]
  } : undefined,
  app.forSale ? {
    path: 'for-sale',
    title: 'For Sale' + ' · ' + app.tabTitle,
    //      description: '',
    //      keywords: ['For', 'Sale', 'Selling']
    children: [
      { path: '', component: ForSaleComponent },
      { path: ':doe', component: ForSaleComponent },
      { path: ':buck', component: ForSaleComponent },
      { path: ':pet', component: ForSaleComponent }
    ]
  } : undefined,
  /*,
  {
    path: 'contact-us', component: ContactUsComponent, data: {
      title: 'Kidding Schedule',
      description: '',
      keywords: ['Contact', 'Us']
    }
  }*/,
  app.kiddingSchedule ? {
    path: 'kidding-schedule',
    title: 'Kidding Schedule' + ' · ' + app.tabTitle,
    //      description: '',
    //      keywords: ['Kidding', 'Schedule']
    children: [
      { path: '', component: KiddingScheduleComponent },
      { path: ':doe', component: KiddingScheduleComponent },
      { path: ':buck', component: KiddingScheduleComponent }
    ]
  } : undefined,
  app.blog ? {
    path: 'blog',
    title: 'Farm Blog' + ' · ' + app.tabTitle,
    //      description: 'See whats happening on the farm',
    //      keywords: ['Blog', 'social', 'socials', 'media', 'facebook']
    component: BlogComponent
  } : undefined,
  {
    path: '**', component: NotFoundComponent,
    title: 'Not Found' + ' · ' + app.tabTitle
  }
].filter(route => !!route) as Routes;
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled', /*preloadingStrategy: PreloadAllModules*/ })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
