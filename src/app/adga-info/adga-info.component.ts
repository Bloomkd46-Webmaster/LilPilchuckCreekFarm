import { Component, Input } from '@angular/core';

import { Goat } from '../goat.service';


@Component({
  selector: 'app-adga-info',
  templateUrl: './adga-info.component.html',
  styleUrls: ['./adga-info.component.scss']
})
export class AdgaInfoComponent {
  @Input() goat!: Goat;

  getKeys(): (keyof Goat)[] {
    return Object.keys(this.goat) as (keyof Goat)[];
  }
  getValue(key: keyof Goat): any {
    return this.goat[key];
  }
  private months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  getBirthday(): string {
    if (!this.goat?.dateOfBirth) return 'Unknown';
    const unparsedBirthday = this.goat.dateOfBirth;
    const birthday = unparsedBirthday.split('T')[0].split('-');
    return `${this.months[parseInt(birthday[1])]} ${birthday[2].startsWith('0') ? birthday[2].slice(1) : birthday[2]}, ${birthday[0]}`;
  }
  getDateObtained(): string | undefined {
    if (!this.goat?.obtained) return;
    const unparsedObtained = this.goat.obtained;
    const obtained = unparsedObtained.split('T')[0].split('-');
    return `${this.months[parseInt(obtained[1])]} ${obtained[2].startsWith('0') ? obtained[2].slice(1) : obtained[2]}, ${obtained[0]}`;
  }
  /*getValue(key: string): string[] {
    const values: string[] = [];
    function _getValue(_goat: any, _key: string): void {
      if (typeof _goat[_key] === 'object') {
        for (const __key of Object.keys(_goat[_key])) {
          _getValue(_goat[_key], __key);
        }
      } else {
        values.push(_goat, _key);
      }
    }
    _getValue(this.goat, key);
    return values;
  }*/
}
