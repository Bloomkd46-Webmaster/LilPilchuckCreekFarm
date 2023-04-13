import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private meta: Meta, private title: Title) { }
  /**@deprecated Use `updateDescription()` and `updateKeywords()` instead*/
  updateMetaTags(tags: { description?: string, keywords?: string[]; }) {
    this.meta.updateTag({ name: 'description', content: tags.description ?? '' }, 'name=\'description\'');
    const keywords = ['4-H', '4H'];//, 'Botsmiths', 'Robotics', 'Snohomish', 'FIRST'];
    tags.keywords ? keywords.push(...tags.keywords) : undefined;
    this.meta.updateTag({
      name: 'keywords', content: keywords.join(', ')
    }, 'name=\'keywords\'');
  }

  /**
   * Updates the <meta name="description" content="{@link description}"> and <meta name="og:description" content="{@link description}">
   * @param description the description to input
   */
  updateDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description ?? '' }, 'name=\'description\'');
    this.meta.updateTag({ name: 'og:description', content: description ?? '' }, 'name=\'og:description\'');
  }
  /**
   * updates the <meta name="keywords" content="{@link keywords}">
   * @param keywords the keywords to input
   */
  updateKeywords(keywords: string[]) {
    const tagKeywords = ['4-H', '4H', 'Goat', 'Goats', 'Nigerian', 'Dwarf', 'Bloom', 'Farm'];
    tagKeywords.push(...keywords);
    this.meta.updateTag({
      name: 'keywords', content: tagKeywords.join(', ')
    }, 'name=\'keywords\'');
  }
  /**
   * Updates the <title>{@link title}</title> and <meta name="og:title" content="{@link title}">
   * @param title the description to input
   */
  updateTitle(title: string) {
    this.title.setTitle(title + ' · Lil\' Pilchuck Creek');
    this.meta.updateTag({ name: 'og:title', content: title ?? '' }, 'name=\'og:title\'');
  }
}
