import { Awards, Goats as ExternalGoats, OwnedGoats } from 'adga';

import { Injectable } from '@angular/core';

import goats from './goats.json';



@Injectable({
  providedIn: 'root'
})
export class GoatService {
  public goats: { does: Goat[], bucks: Goat[], references: ExternalGoat[]; } = goats as any;
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
  }
  constructor() { }
}
export type Goat = (OwnedGoats['result']['items'][number] & { nickname: string; description: string; awards: Awards['result']['items']; });
export type ExternalGoat = (ExternalGoats['result']['items'][number] & { awards: Awards['result']['items']; });
