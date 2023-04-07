import { Awards, Goats as ExternalGoats, OwnedGoats } from 'adga';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GoatService {
  constructor(private http: HttpClient) { }
  getDoes(): Promise<Goat[]> {
    return new Promise(resolve => this.http.get<Goat[]>('/assets/goats/does.json').subscribe(data => resolve(data)));
  }
  getBucks(): Promise<Goat[]> {
    return new Promise(resolve => this.http.get<Goat[]>('/assets/goats/bucks.json').subscribe(data => resolve(data)));
  }
  getReferences(): Promise<ExternalGoat[]> {
    return new Promise(resolve => this.http.get<ExternalGoat[]>('/assets/goats/references.json').subscribe(data => resolve(data)));
  }
  async getParents(goat: Goat): Promise<{ dam: ExternalGoat; damsDam: ExternalGoat; damsSire: ExternalGoat; sire: ExternalGoat; siresDam: ExternalGoat; siresSire: ExternalGoat; }> {
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
  private getRawKiddingSchedule(): Promise<{ bred: string; dam: number; sire: number; due: string; }[]> {
    return new Promise(resolve => this.http.get<{ bred: string; dam: number; sire: number; due: string; }[]>('/assets/goats/kidding-schedule.json').subscribe(data => resolve(data)));
  }
  async getKiddingSchedule(): Promise<KiddingSchedule[]> {
    const kiddingSchedule = await this.getRawKiddingSchedule();
    const does = await this.getDoes();
    const bucks = await this.getBucks();
    return kiddingSchedule.map(kidding => {
      return {
        bred: kidding.bred,
        dam: does.find(doe => doe.id === kidding.dam)!,
        sire: bucks.find(buck => buck.id === kidding.sire)!,
        due: kidding.due,
      };
    });
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
export type KiddingSchedule = { bred: string; dam: Goat; sire: Goat; due: string; };
