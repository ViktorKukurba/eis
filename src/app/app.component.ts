import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import * as $ from 'jquery'
import {Utils} from "./shared/index";
// import './js/bootstrap.min.js'
// import './js/owl.carousel.min'
// var jquery:any;
// declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent implements OnInit {

  constructor( private appService: AppService ) { }

  ngOnInit() {
    $("#preloader").delay(600).fadeOut();
    this.appScrollHandler()
    $('#back-to-top').on('click', function(){
      $('body,html').animate({
        scrollTop: 0
      }, 600);
    });
    // this.appService.getSettings()
  }

  appScrollHandler() {
    ///////////////////////////
    // On Scroll
    $(window).on('scroll', function() {
      var links = document.querySelectorAll('#nav .main-nav a');
      for (let link of Array.from(links)) {
        var id = link.getAttribute('ng-reflect-href')
        if (Utils.isElementOnView(document.querySelector(id))) {
          link.classList.add('active')
        } else {
          link.classList.remove('active')
        }
      }

      var wScroll = $(this).scrollTop();

      // Fixed nav
      wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

      // Back To Top Appear
      wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
    });
  }
}
