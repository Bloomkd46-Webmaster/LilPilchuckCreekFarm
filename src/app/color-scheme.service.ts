import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ColorSchemeService {
  /** Wether or not the browser is using dark mode */
  public darkMode;
  /** Wether or not the browser is using light mode */
  public lightMode;

  constructor() {
    this.darkMode = this.getDarkMode();
    this.lightMode = this.getLightMode();
    window.matchMedia("(prefers-color-scheme: dark)").onchange = () => {
      location.reload();
      this.darkMode = this.getDarkMode();
      this.lightMode = this.getLightMode();
    };
  }

  /**
   * Returns wether or not the prefers-color-scheme media equals dark
   * @returns if prefers-color-scheme: dark is true
   */
  public getDarkMode() {
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      // If the browser does not support prefers-color-scheme, set the default to dark.
      return true;
    }
  }
  /**
   * Returns wether or not the prefers-color-scheme media equals light
   * @returns if prefers-color-scheme: light is true
   */
  public getLightMode() {
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      return !window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      // If the browser does not support prefers-color-scheme, set the default to dark.
      return false;
    }
  }
}
