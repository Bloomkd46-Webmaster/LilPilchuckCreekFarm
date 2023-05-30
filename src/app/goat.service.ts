import { Awards, Goats as ExternalGoats, OwnedGoats } from 'adga';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GoatService {
  constructor(private http: HttpClient) { }
  private _does?: Goat[];
  getDoes(): Promise<Goat[]> {
    if (this._does) {
      console.debug('Used Does From Cache', this._does);
      return Promise.resolve(this._does);
    } else {
      return new Promise(resolve => this.http.get<Goat[]>('/assets/goats/does.json')
        .subscribe(data => {
          this._does = data;
          console.debug('Loaded Does From Server', data);
          resolve(data);
        }));
    }
    ////return this._does ? this._does : new Promise(resolve => this.http.get<Goat[]>('/assets/goats/does.json').subscribe(data => resolve(data)));
  }
  private _bucks?: Goat[];
  getBucks(): Promise<Goat[]> {
    if (this._bucks) {
      console.debug('Used Bucks From Cache', this._bucks);
      return Promise.resolve(this._bucks);
    } else {
      return new Promise(resolve => this.http.get<Goat[]>('/assets/goats/bucks.json')
        .subscribe(data => {
          this._bucks = data;
          console.debug('Loaded Bucks From Server', data);
          resolve(data);
        }));
    }
  }
  private _references?: ExternalGoat[];
  getReferences(): Promise<ExternalGoat[]> {
    if (this._references) {
      console.debug('Used References From Cache', this._references);
      return Promise.resolve(this._references);
    } else {
      return new Promise(resolve => this.http.get<ExternalGoat[]>('/assets/goats/references.json')
        .subscribe(data => {
          this._references = data;
          console.debug('Loaded References From Server', data);
          resolve(data);
        }));
    }
    ////return new Promise(resolve => this.http.get<ExternalGoat[]>('/assets/goats/references.json').subscribe(data => resolve(data)));
  }
  private _pets?: Pet[];
  getPets(): Promise<Pet[]> {
    if (this._pets) {
      console.debug('Used Pets From Cache', this._pets);
      return Promise.resolve(this._pets);
    } else {
      return new Promise(resolve => this.http.get<Pet[]>('/assets/goats/pets.json')
        .subscribe(data => {
          this._pets = data;
          console.debug('Loaded Pets From Server', data);
          resolve(data);
        }));
    }
    ////return new Promise(resolve => this.http.get<ExternalGoat[]>('/assets/goats/references.json').subscribe(data => resolve(data)));
  }
  async getParents(goat: Goat): Promise<Parents> {
    const references = await this.getReferences();
    const dam = references.find(reference => reference.id === goat.damId)!;
    const sire = references.find(reference => reference.id === goat.sireId)!;
    return {
      dam: dam,
      damsDam: references.find(reference => reference.id === dam.damId)!,
      damsSire: references.find(reference => reference.id === dam.sireId)!,
      sire: sire,
      siresDam: references.find(reference => reference.id === sire.damId)!,
      siresSire: references.find(reference => reference.id === sire.sireId)!,
    };
  }
  private _rawKiddingSchedule?: RawKiddingSchedule[];
  private getRawKiddingSchedule(): Promise<RawKiddingSchedule[]> {
    if (this._rawKiddingSchedule) {
      console.debug('Used Kidding Schedule From Cache', this._rawKiddingSchedule);
      return Promise.resolve(this._rawKiddingSchedule);
    } else {
      return new Promise(resolve => this.http.get<RawKiddingSchedule[]>('/assets/goats/kidding-schedule.json')
        .subscribe(data => {
          this._rawKiddingSchedule = data;
          console.debug('Loaded Kidding Schedule From Server', data);
          resolve(data);
        }));
    }
    ////return new Promise(resolve => this.http.get<RawKiddingSchedule[]>('/assets/goats/kidding-schedule.json').subscribe(data => resolve(data)));
  }
  async getKiddingSchedule(): Promise<KiddingSchedule[]> {
    console.debug('Compiling Kidding Schedule...');
    const kiddingSchedule = await this.getRawKiddingSchedule();
    const does = await this.getDoes();
    const bucks = await this.getBucks();
    const schedule = kiddingSchedule.map(kidding => {
      return {
        ...kidding,
        dam: does.find(doe => doe.id === kidding.dam)!,
        sire: bucks.find(buck => buck.id === kidding.sire)!,
      };
    });
    console.debug('Compiled Kidding Schedule', schedule);
    return schedule;
  }
  private _forSale?: ForSale;
  getForSale(): Promise<ForSale> {
    if (this._forSale) {
      console.debug('Used For Sale From Cache', this._forSale);
      return Promise.resolve(this._forSale);
    } else {
      return new Promise(resolve => this.http.get<ForSale>('/assets/goats/for-sale.json')
        .subscribe(data => {
          this._forSale = data;
          console.debug('Loaded For Sale From Server', data);
          resolve(data);
        }));
    }
    ////return new Promise(resolve => this.http.get<ExternalGoat[]>('/assets/goats/references.json').subscribe(data => resolve(data)));
  }
  /*private does?: Goat[];
  getDoes(): Promise<Goat[]> {
    return new Promise((resolve, reject) => {
      if (this.does) {
        resolve(this.does);
      } else {
        this.http.get<Goat[]>('/assets/goats/does.json').subscribe(data => {
          this.does = data;
          resolve(data);
        });
      }
    });
  }*/

  /*public goats: { does: Goat[], bucks: Goat[], references: ExternalGoat[]; } = goats as any;
  public does = this.goats.does;
  public bucks = this.goats.bucks;
  public references = this.goats.references;

  getParents(goat: Goat): { dam: ExternalGoat; damsDam: ExternalGoat; damsSire: ExternalGoat; sire: ExternalGoat; siresDam: ExternalGoat; siresSire: ExternalGoat; } {
    const dam = this.references.find(reference => reference.id === goat.damId)!;
    const sire = this.references.find(reference => reference.id === goat.sireId)!;
    return {
      dam: dam,
      damsDam: this.references.find(reference => reference.id === dam.damId)!,
      damsSire: this.references.find(reference => reference.id === dam.sireId)!,
      sire: sire,
      siresDam: this.references.find(reference => reference.id === sire.damId)!,
      siresSire: this.references.find(reference => reference.id === sire.sireId)!,
    };
  }*/
}
export type Goat = (OwnedGoats['result']['items'][number] & { nickname: string; description: string; awards: Awards['result']['items']; });
export type ExternalGoat = (ExternalGoats['result']['items'][number] & { awards: Awards['result']['items']; });
export type Pet = { nickname: string; name: string; description: string; };
export type Parents = { dam: ExternalGoat; damsDam: ExternalGoat; damsSire: ExternalGoat; sire: ExternalGoat; siresDam: ExternalGoat; siresSire: ExternalGoat; };
export type RawKiddingSchedule = { bred: string; dam: number; sire: number; due: string; does: number; wethers: number; reservations: string[]; kidded?: string; };
export type KiddingSchedule = { bred: string; dam: Goat; sire: Goat; due: string; does: number; wethers: number; reservations: string[]; kidded?: string; };
export type ForSaleGoat = { nickname: string; description: string; price?: string; };
export type ForSale = { does: ForSaleGoat[]; bucks: ForSaleGoat[]; wethers: ForSaleGoat[]; };