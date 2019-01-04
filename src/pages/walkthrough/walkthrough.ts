import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';


@Component({
  selector: 'walkthrough-page',
  templateUrl: 'walkthrough.html'
})
export class WalkthroughPage {

  lastSlide = false;
  main_page: { component: any };

  @ViewChild('slider') slider: Slides;

  constructor(public nav: NavController) {
    this.main_page = { component: TabsNavigationPage };

  }

  skipIntro() {
    // You can skip to main app
    // this.nav.setRoot(TabsNavigationPage);

    // Or you can skip to last slide (login/signup slide)
    if (this.lastSlide != true) {
      this.lastSlide = true;
      this.slider.slideTo(this.slider.length());
    } else {
      this.nav.setRoot(TabsNavigationPage);
    }
  }

  onSlideChanged() {
    // If it's the last slide, then hide the 'Skip' button on the header
    this.lastSlide = this.slider.isEnd();
  }

  goToLogin() {
    this.nav.push(LoginPage);
  }

  goToSignup() {
    this.nav.push(SignupPage);
  }
}
