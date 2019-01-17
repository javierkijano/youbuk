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
  ) {

    
    //this.categories = fireStore.collection<any>('CATEGORIES');
    
    /* working after first time
    this.categories.doc('0').ref.onSnapshot(x => {
      console.log(x.data()['CATEGORY'])
    })
    */

    /* working
    this.categories.doc('0').valueChanges().subscribe(x => {
      let a = 0
    })
    */
    
    /* working
    this.categories.doc('0').ref.onSnapshot(x => {
      console.log(x.data()['CATEGORY'])
    })
    */
    
    
    

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


  goToFeed(category: any) {
    console.log("Clicked goToFeed", category);
    this.nav.push(FeedPage, { category: category });
  }

}
