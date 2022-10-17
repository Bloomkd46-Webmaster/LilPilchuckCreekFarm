export interface Goats {
  /** Path To This Schema */
  $schema: string;
  /** Array Of Goats */
  goats: Goat[];
}
export interface Goat {
  /** Short Name */
  nickname: string;
  /** Registered Name (Name On Registration Papers) */
  registeredName: string;
  /** Any Known Awards */
  awards?: Award[];
  dam: Parent;
  sire: Parent;
  /** Date Of Birth */
  dob: string;
  /** Description Found On Registration Papers */
  color: string;
  /** Horn Type (Polled Or Disbudded) */
  horns: 'polled' | 'disbudded' | string;
  /** Images (Relative To The assets/images Directory) */
  images?: string[];
  /** Optional Description Of The Goat */
  description?: string;
}
interface Parent {
  /** Sire's Name */
  name: string;
  /** Sire's Sire (SS) */
  sire: string | Grandparent;
  /** Sire's Dam (SD) */
  dam: string | Grandparent;
  /** DNA Tested */
  DNA?: boolean;
  /** Stars */
  stars?: string[];
}
interface Grandparent {
  /** Sire's Name */
  name: string;
  /** DNA Tested */
  DNA?: boolean;
  /** Stars */
  stars?: string[];
}
interface Award {
  /** Award Level (Grand Champion, Reserve Grand Champion, etc.) */
  level: string;
  /** Award Division (Junior Doe, Senior Doe, Breed, etc.) */
  division: string;
  /** Event Name Prefixed By Year (2022 Evergreen State Fair, 2023 Udder Spectacular, etc.) */
  event: string;
}
