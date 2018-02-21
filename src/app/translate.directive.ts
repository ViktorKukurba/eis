import { Directive, ElementRef, OnInit } from '@angular/core';
import {StaticTranslations} from "./shared/constants";

@Directive({
  selector: '[appTranslate]'
})
export class TranslateDirective implements OnInit {

  private element:any;

  constructor(el: ElementRef) {
    this.element = el;
  }

  ngOnInit() {
    this.element.nativeElement.textContent = StaticTranslations.translate(this.element.nativeElement.textContent);
  }

}
