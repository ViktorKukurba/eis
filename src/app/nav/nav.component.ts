import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { AppService } from '../app.service';
import { Utils } from '../shared'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  links = [{ title: 'Головна', hash: 'home' },
    { title: 'Про нас', hash: 'about' },
    { title: 'Вакансії', hash: 'vacancies' },
    { title: 'Контакти', hash: 'contact' }
  ];

  activeSection:string;
  fixedNav: boolean;

  constructor(private appService:AppService) { }

  ngOnInit() {
    ///////////////////////////
    // Mobile dropdown
    $('.has-dropdown a').on('click', function() {
      $(this).parent().toggleClass('open-drop');
    });

    this.appService.windowScroll.subscribe(position => {
      this.fixedNav = position > 1
    });

    this.appService.activeSection.subscribe(section => {
      this.activeSection = section ? section.replace('#', '') : section;
    });
  }

  // Smooth scroll
  navigate(event, link) {
    event.preventDefault();
    Utils.scrollTo(link.hash);
  }

  toggleNav() {
    $('#nav').toggleClass('open');
  }
}
