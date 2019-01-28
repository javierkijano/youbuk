import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import 'rxjs/Rx';

import moment from 'moment'
import { SearchServicePage } from '../search-service/search-service';

import {} from '@angular/fire'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Rx';
import { SubcategoriesListingPage } from '../listing-subcategories/listing-subcategories';

import { PopularsModel, PopularsItemModel, CategoriesModel, CategoriesItemModel } from '../../providers/app-data/app-data.model';
import { AppDataService } from '../../providers/app-data/app-data.service';



@Component({
  selector: 'listing-page',
  templateUrl: 'listing.html',
})
export class ListingPage implements OnInit {
  categoriesModel: CategoriesModel;
  selectedCategories: CategoriesItemModel[];
  popularsModel: PopularsModel;
  selectedPopulars: PopularsItemModel[];
  categories: any;
  
  constructor(
    public nav: NavController,
    public appData: AppDataService
  ) { }

  ngOnInit() {
    this.categoriesModel = this.appData.getCategoriesModel()
    this.popularsModel = this.appData.getPopularsModel()
  }

  onSearchByKeyword(event: any) {
    this.goToServicesPage(event.target.value)
  }

  ionViewDidLoad() {}

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
