import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {
    path: '', component: HomeComponent, data: {
      title: 'Home',
      description: 'The Botsmiths is a team located in Snohomish County Washington and sponsored by the Snohomish County 4-H Technology Program. As a 4-H Technology Program offering, 4-H Clubs from across Snohomish County you are welcome to join the Botsmiths! The 4-H Technology Botsmiths offers opportunities for youth in First Robotics Competition, First Tech Challenge, First Lego League, and First Lego League Junior.',
      keywords: ['Home'],
    }
  },
  { path: 'home', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
