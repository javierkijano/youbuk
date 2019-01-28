import { Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import 'rxjs/Rx';

import { PopularsModel, PopularsItemModel, SubcategoriesModel, SubcategoriesItemModel } from '../../providers/app-data/app-data.model';
import { AppDataService } from '../../providers/app-data/app-data.service';

import moment from 'moment'
import { SearchServicePage } from '../search-service/search-service';

import {} from '@angular/fire'
import {Observable} from 'rxjs'

@Component({
  selector: 'listing-subcategories-page',
  templateUrl: 'listing-subcategories.html',
})
export class SubcategoriesListingPage implements OnInit {
  subcategoriesModel: SubcategoriesModel;
  selectedSubcategories: SubcategoriesItemModel[];
  popularsModel: PopularsModel;
  selectedPopulars: PopularsItemModel[];
  selectedCategory: any;

  constructor(
    public nav: NavController,
    public appData: AppDataService,
    public navParams: NavParams
  ) {

    this.selectedCategory = navParams.get("selectedCategory");
    
  }

  ngOnInit() {
    this.subcategoriesModel = this.appData.getSubcategoriesModel()
    this.selectedSubcategories = this.subcategoriesModel.subcategories
      .filter(x => { return x.category_id == this.selectedCategory.category_id})
    this.popularsModel = this.appData.getPopularsModel()
  }

  onSearchByKeyword(event: any) {
    //alert('onSearchByKeyword: onSearchByKeyword invoked' + event);
    //alert('onSearchByKeyword: time: ' + moment().valueOf());
    console.log("search event in search");
    this.nav.push(SearchServicePage, {initialText: event.target.value});
    console.log("coming back from SearchServicePage");
  }

  ionViewDidLoad() { }

  /*
  goToServicesPage(subcategory: any) {
    console.log("Clicked goToServicesPage", subcategory);
    this.nav.push(SubcategoriesListingPage, { selectdSubcategory: subcategory });
  }
  */
}
