import { Component, OnInit } from '@angular/core';

import { ColorSchemeService } from '../color-scheme.service';
import { Blog, GoatService } from '../goat.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public blog?: Blog = [];
  constructor(public goatService: GoatService, public colorScheme: ColorSchemeService) {

  }
  ngOnInit(): void {
    this.goatService.getBlog().then(blog => this.blog = blog);
    setTimeout(() => this.blog?.length ? undefined : this.blog = undefined, 100);
  }
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
}

