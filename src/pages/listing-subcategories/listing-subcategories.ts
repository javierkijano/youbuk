import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import 'rxjs/Rx';

import { SubcategoriesListingModel } from './listing-subcategories.model';
import { SubcategoriesListingService } from './listing-subcategories.service';

import moment from 'moment'
import { SearchServicePage } from '../search-service/search-service';

import {} from '@angular/fire'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Rx';



@Component({
  selector: 'listing-subcategories-page',
  templateUrl: 'listing-subcategories.html',
})
export class SubcategoriesListingPage {
  listing: SubcategoriesListingModel = new SubcategoriesListingModel();
  subcategories: any;
  selectedCategory: any;

  constructor(
    public nav: NavController,
    public subcategorieslistingService: SubcategoriesListingService,
    private fireStore: AngularFirestore,
    public navParams: NavParams
  ) {
    this.selectedCategory = navParams.get("selectedCategory");
    let a = 0
  }

  onSearchByKeyword(event: any) {
    //alert('onSearchByKeyword: onSearchByKeyword invoked' + event);
    //alert('onSearchByKeyword: time: ' + moment().valueOf());
    console.log("search event in search");
    this.nav.push(SearchServicePage, {initialText: event.target.value});
    console.log("coming back from SearchServicePage");
  }

  ionViewDidLoad() {
    this.listing.banner_image = "./assets/images/listing/600x300banner1.png";
    this.listing.banner_title = "Sports";

    this.subcategorieslistingService
      .getPopulars()
      .subscribe(data => {
        this.listing.populars = data;
      });

    this.subcategorieslistingService
      .getSubcategories(this.selectedCategory)
      .subscribe(data => {
        this.listing.subcategories = data;
      });
  }

  /*
  goToServicesPage(subcategory: any) {
    console.log("Clicked goToServicesPage", subcategory);
    this.nav.push(SubcategoriesListingPage, { selectdSubcategory: subcategory });
  }
  */
}
