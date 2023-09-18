import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { ColorSchemeService } from '../color-scheme.service';
import { Blog, GoatService } from '../goat.service';
import { MetaService } from '../meta.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public blog?: Blog = [];
  routeTitle?: string;
  constructor(public goatService: GoatService, public colorScheme: ColorSchemeService, public metaService: MetaService, private router: Router) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.routeTitle = val.urlAfterRedirects.split('#').pop()?.replace(/-|%20/g, ' ');
        if (this.routeTitle) {
          this.goatService.getBlog().then(blog => {
            const post = blog.find(post => post.title.replace(/-|%20/g, ' ') === this.routeTitle);
            if (post) {
              document.getElementById(post.title)?.scrollIntoView({ block: 'end' });
              //this.scrollToTargetAdjusted(post.title);
              this.metaService.updateTitle(`${post.title} · Farm Blog`);
              this.metaService.updateDescription(this.getHTML(post.description));
            }
          });
        }
      }
    });
  }
  ngOnInit(): void {
    this.goatService.getBlog().then(blog => {
      this.blog = blog;
      const interval = setInterval(() => {
        const post = blog.find(post => post.title.replace(/-|%20/g, ' ') === this.routeTitle);
        if (post) {
          document.getElementById(post.title)?.scrollIntoView({ block: 'end' });
          //this.scrollToTargetAdjusted(post.title);
          this.metaService.updateTitle(`${post.title} · Farm Blog`);
          this.metaService.updateDescription(this.getHTML(post.description));
          clearInterval(interval);
        }
      });
    });
    setTimeout(() => this.blog?.length ? undefined : this.blog = undefined, 100);
  }
  /*
scrollToTargetAdjusted(title: string): void {
var element = document.getElementById(title)!;
var headerOffset = 160;
var elementPosition = element.getBoundingClientRect().top;
var offsetPosition = elementPosition + window.screenY - headerOffset;


window.scrollTo({
  top: offsetPosition,
  behavior: "smooth"
});
}*/
  images(images: string | string[]): boolean {
    return typeof images === 'object' ?? false;
  }
  getImages(images: string | string[]): string[] {
    return images as string[];
  }

  getHTML(obj: Record<string, any> | string): string {
    if (typeof obj === 'string') {
      return obj;
    }
    // Define a function that converts an object or an array to HTML
    function objToHTML(obj: Record<string, any> | Array<Record<string, any>>): string {
      // Initialize an empty string to store the HTML
      let html = "";
      // Check if the input is an array
      if (Array.isArray(obj)) {
        // Loop through the array elements
        for (let elem of obj) {
          // If the element is an object, recursively call the function and append the result
          if (typeof elem === "object") {
            html += objToHTML(elem);
          } else {
            html += elem;
          }
        }
      }
      // Otherwise, assume the input is an object
      else {
        // Loop through the keys of the object
        for (let key in obj) {
          // If the value of the key is a string, wrap it with the key as a tag
          if (typeof obj[key] === "string") {
            if (key === 'br') {
              html += '<br>';
            } else if (key === '') {
              html += obj[key];
            } else {
              html += `<${key}>${obj[key]}</${key}>`;
            };
          }
          // If the value of the key is an object or an array, recursively call the function and wrap it with the key as a tag
          else if (typeof obj[key] === "object") {
            html += `<${key}>${objToHTML(obj[key])}</${key}>`;
          }
        }
      }
      // Return the HTML string
      return html;
    }

    return objToHTML(obj);
  }
  copy(title: string): void {
    // Copy the text inside the text field
    const text = `${window.location.href.split('#')[0]}#${title}`;
    navigator.clipboard.writeText(text);
    console.log(text);
  }
}

