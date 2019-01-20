import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import 'rxjs/Rx';

import { ListingModel } from './listing.model';
import { ListingService } from './listing.service';

import moment from 'moment'
import { SearchServicePage } from '../search-service/search-service';

import {} from '@angular/fire'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Rx';
import { SubcategoriesListingPage } from '../listing-subcategories/listing-subcategories';




@Component({
  selector: 'listing-page',
  templateUrl: 'listing.html',
})
export class ListingPage {
  listing: ListingModel = new ListingModel();
  categories: any;

  constructor(
    public nav: NavController,
    public listingService: ListingService,
    private fireStore: AngularFirestore
  ) { }

  onSearchByKeyword(event: any) {
    this.goToServicesPage(event.target.value)
  }

  ionViewDidLoad() {
    this.listing.banner_image = "./assets/images/listing/600x300banner1.png";
    this.listing.banner_title = "Sports";

    this.listingService
      .getPopulars()
      .subscribe(data => {
        this.listing.populars = data;
      });

    this.listingService
      .getCategories()
      .subscribe(data => {
        this.listing.categories = data;
      }); 
  }


  goToSubcategoriesPage(category: any) {
    console.log("Clicked goToSubcategory", category);
    this.nav.push(SubcategoriesListingPage, { selectedCategory: category });
  }

  goToServicesPage(searchBarText: string) {
    console.log("search event in search");
    this.nav.push(SearchServicePage, {initialText: searchBarText});
    console.log("coming back from SearchServicePage");
  }

}
