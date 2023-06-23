

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';

import { AdgaInfoComponent } from './adga-info/adga-info.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BucksComponent } from './bucks/bucks.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DoesComponent } from './does/does.component';
import { ForSaleGoatModalComponent } from './for-sale-goat-modal/for-sale-goat-modal.component';
import { ForSaleGoatComponent } from './for-sale-goat/for-sale-goat.component';
import { ForSaleComponent } from './for-sale/for-sale.component';
import { GoatModalComponent } from './goat-modal/goat-modal.component';
import { GoatComponent } from './goat/goat.component';
import { HomeComponent } from './home/home.component';
import { KiddingScheduleComponent } from './kidding-schedule/kidding-schedule.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PetsComponent } from './pets/pets.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BucksComponent,
    GoatComponent,
    KiddingScheduleComponent,
    DoesComponent,
    GoatModalComponent,
    ContactUsComponent,
    PetsComponent,
    ForSaleComponent,
    ForSaleGoatComponent,
    ForSaleGoatModalComponent,
    NotFoundComponent,
    AdgaInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [Meta],
  bootstrap: [AppComponent]
})
export class AppModule { }
