import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BucksComponent } from './bucks/bucks.component';
import { JuniorDoesComponent } from './does/junior-does/junior-does.component';
import { SeniorDoesComponent } from './does/senior-does/senior-does.component';
import { HomeComponent } from './home/home.component';
import { GoatComponent } from './goat/goat.component';
import { KiddingScheduleComponent } from './kidding-schedule/kidding-schedule.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JuniorDoesComponent,
    SeniorDoesComponent,
    BucksComponent,
    GoatComponent,
    KiddingScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Meta],
  bootstrap: [AppComponent]
})
export class AppModule { }
