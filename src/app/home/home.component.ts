import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Utils } from '../shared'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'ТзОВ НВЦ "ЄВРОІНВЕСТСЕРВІС"';
  subtitle = 'Ми успішно надаємо послуги працевлаштування за будівельними спеціальностями громадянам України, Білорусі та Молдови на території Польші, Литви, Латвії та Німеччини'
  vacanciesLink = 'Пошук вакансій'
  formLink = 'Залишити заявку'

  constructor(private location: Location) {}

  navigateTo(link) {
    Utils.scrollTo(link)
  }

  ngOnInit() {
  }

}
