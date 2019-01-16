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
  temp: Observable<any>;

  constructor(
    public nav: NavController,
    public listingService: ListingService,
    private fireStore: AngularFirestore
  ) {

    
    this.categories = fireStore.collection<any>('CATEGORIES');
    
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
    this.listingService
      .getData()
      .then(data => {
        this.listing.banner_image = data.banner_image;
        this.listing.banner_title = data.banner_title;
        this.listing.populars = data.populars;
        this.listing.categories = data.categories;
      });
  }


  goToFeed(category: any) {
    console.log("Clicked goToFeed", category);
    this.nav.push(FeedPage, { category: category });
  }

}
