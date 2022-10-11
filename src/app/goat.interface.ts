export interface Goats {
  /** Path To This Schema */
  $schema: string;
  /** Array Of Goats */
  goats: Goat[];
};
export interface Goat {
  /** Short Name */
  shortName: string;
  /** Registered Name (Name On Registration Papers) */
  registeredName: string;
  /** Any Known Awards */
  awards?: Award[];
  dam: Dam;
  sire: Sire;
  /** Date Of Birth */
  dob: string;
  /** Description Found On Registration Papers */
  color: string;
  /** Horn Type (Polled Or Disbudded) */
  horns: 'polled' | 'disbudded';
  /** Images (Relative To The assets/images Directory) */
  images?: string[];
  /** Optional Description Of The Goat */
  description?: string;
}
interface Sire {
  /** Sire's Name */
  name: string;
  /** Sire's Sire (SS) */
  sire: string;
  /** Sire's Dam (SD) */
  dam: string;
}
interface Dam {
  /** Dam's Name */
  name: string;
  /** Dam's Sire (DS) */
  sire: string;
  /** Dam's Dam (DD) */
  dam: string;
}
interface Award {
  /** Award Level (Grand Champion, Reserve Grand Champion, etc.) */
  level: string;
  /** Award Division (Junior Doe, Senior Doe, Breed, etc.) */
  division: string;
  /** Event Name Prefixed By Year (2022 Evergreen State Fair, 2023 Udder Spectacular, etc.) */
  event: string;
}
