import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BucksComponent } from './bucks/bucks.component';
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
  /*{
    path: 'does', data: {
      title: 'Does',
      description: '',
      keywords: ['Doe', 'Does']
    }, children: [
      {
        path: 'senior', data: {
          title: 'Senior Does',
          description: '',
          keywords: ['Does', 'Doe', 'Senior', 'Milking']
        }, children: [
          { path: '', component: SeniorDoesComponent },
          { path: ':doe', component: SeniorDoesComponent }
        ]
      },
      {
        path: 'junior', data: {
          title: 'Junior Does',
          description: '',
          keywords: ['Does', 'Doe', 'Junior', 'Dry']
        }, children: [
          { path: '', component: JuniorDoesComponent },
          { path: ':doe', component: JuniorDoesComponent }
        ]
      }
    ]
  },*/
  {
    path: 'bucks', data: {
      title: 'Bucks',
      description: '',
      keywords: ['Bucks', 'Buck', 'Junior', 'Senior']
    }, children: [
      { path: '', component: BucksComponent },
      { path: ':buck', component: BucksComponent }
    ]
  }, {
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
    path: 'kidding-schedule', component: KiddingScheduleComponent, data: {
      title: 'Kidding Schedule',
      description: '',
      keywords: ['Kidding', 'Schedule']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
