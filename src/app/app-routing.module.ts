import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BucksComponent } from './bucks/bucks.component';
import { JuniorDoesComponent } from './does/junior-does/junior-does.component';
import { SeniorDoesComponent } from './does/senior-does/senior-does.component';
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
    path: 'does', children: [
      {
        path: 'senior', children: [
          { path: '', component: SeniorDoesComponent },
          { path: ':doe', component: SeniorDoesComponent }
        ]
      },
      {
        path: 'junior', children: [
          { path: '', component: JuniorDoesComponent },
          { path: ':doe', component: JuniorDoesComponent }
        ]
      }
    ]
  },
  {
    path: 'bucks', children: [
      { path: '', component: BucksComponent },
      { path: ':doe', component: BucksComponent }
    ]
  },
  { path: 'kidding-schedule', component: KiddingScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
