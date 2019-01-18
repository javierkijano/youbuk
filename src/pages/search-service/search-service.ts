import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';

import { ServiceItemModel, SearchServiceModel } from '../search-service/search-service.model';
import { SearchServiceService} from '../search-service/search-service.service'


//import {Observable} from '@angular/core'
/**
 * Generated class for the SearchServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-service',
  templateUrl: 'search-service.html',
})
export class SearchServicePage {

  initialText: string
  searchBarText: string
  //services: any[]
  searchServiceModel: SearchServiceModel = new SearchServiceModel();
  searchControl: FormControl
  searching: boolean
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public searchServiceService: SearchServiceService) {
      this.searching = false
      this.searchBarText = navParams.get("initialText");
      this.searchControl = new FormControl();
      
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  ionViewDidLoad() {
 
    console.log('ionViewDidLoad')
    this.initializeSearchServiceList()
    //this.setFilteredServices()
    this.searching = false;
    let _this = this
    this.searchControl.valueChanges.debounceTime(400).subscribe(
      () => {
        _this.searching = false//true
      }
    );
  }

  onSearchInput(event)
  {
    if (event.data == null) {
      this.initializeSearchServiceList()
    }
    if (this.searching == false)
    {
      this.setFilteredServices()
    }
    this.searching = false
  }

  onSearchByKeywordCancel(event)
  {
    this.searching = true
    this.initializeSearchServiceList()
    this.setFilteredServices()
    this.searching = false

  }

  onSearchByKeywordClear(event)
  {
    this.searching = true
    this.initializeSearchServiceList()
    this.setFilteredServices()
    this.searching = false
  }


  setFilteredServices() {//event) {
 
    this.searchServiceModel.services = this.filterServices(this.searchBarText)

  }

  filterServices(searchBarText) {
    return this.searchServiceModel.services.filter((service) => {
      return service.service.toLowerCase().indexOf(searchBarText.toLowerCase()) > -1;
    });
  }
 
 initializeSearchServiceList() {
    let _this = this
    this.searchServiceService
      .getServices()
      .subscribe(data => {
        _this.searchServiceModel.services = data;
      });
  }

}
