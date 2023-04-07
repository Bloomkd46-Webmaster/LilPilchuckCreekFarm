import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BucksComponent } from './bucks/bucks.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DoesComponent } from './does/does.component';
import { HomeComponent } from './home/home.component';
import { KiddingScheduleComponent } from './kidding-schedule/kidding-schedule.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent, data: {
      title: 'Home',
      description: '',
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
    path: 'contact-us', component: ContactUsComponent, data: {
      title: 'Kidding Schedule',
      description: '',
      keywords: ['Contact', 'Us']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
