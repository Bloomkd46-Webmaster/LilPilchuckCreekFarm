import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BucksComponent } from './bucks/bucks.component';
import { DoesComponent } from './does/does.component';
import { GoatModalComponent } from './goat-modal/goat-modal.component';
import { GoatComponent } from './goat/goat.component';
import { HomeComponent } from './home/home.component';
import { KiddingScheduleComponent } from './kidding-schedule/kidding-schedule.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BucksComponent,
    GoatComponent,
    KiddingScheduleComponent,
    DoesComponent,
    GoatModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Meta],
  bootstrap: [AppComponent]
})
export class AppModule { }
