import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import {  } from '../search-service/search-service.model';
import { FeedPage } from '../feed/feed';
import { AppDataService } from '../../providers/app-data/app-data.service';
import { ServicesModel, ServicesItemModel } from '../../providers/app-data/app-data.model'
import { Observable} from 'rxjs'

@IonicPage()
@Component({
  selector: 'page-search-service',
  templateUrl: 'search-service.html',
})
export class SearchServicePage implements OnInit {

  initialText: string
  searchBarText: string
  servicesModel: ServicesModel;
  selectedServices: ServicesItemModel[];

  searchControl: FormControl
  searching: boolean
  
  constructor(
    public nav: NavController,
    public navParams: NavParams,
    //public searchServiceService: SearchServiceService,
    public appData: AppDataService) {

      this.searching = false
      this.searchBarText = navParams.get("initialText");
      this.searchControl = new FormControl();
  
  }

  ngOnInit () {
    this.servicesModel = this.appData.getServicesModel();
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
    //this.initializeSearchServiceList()
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
      //this.initializeSearchServiceList()
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
    //this.initializeSearchServiceList()
    this.setFilteredServices()
    this.searching = false

  }

  onSearchByKeywordClear(event)
  {
    this.searching = true
    //this.initializeSearchServiceList()
    this.setFilteredServices()
    this.searching = false
  }

  // filter
  setFilteredServices() {
    this.selectedServices = this.servicesModel.services
      .filter((service) => {
        if (!service.serviceSelected) {
          return false
        }
        let serviceMatched = true
        let searchBarWords = ['']
        try {
          searchBarWords = this.searchBarText.normalize('NFD')
            .toLowerCase().replace(/[\u0300-\u036f]/g, "")
            .split(' ')
            .filter((x) => {if (x.length > 0) { return x }})
        }
        catch (err) {
          let a = 0
        }

        /*
        if (service.SERVICES_KEYWORDS["key_words"] == "") {
          return false
        }
        */

        let serchBarServiceMatching = service.SERVICES_KEYWORDS
          .map(x => {
            return this.checkSerchBarMatching(searchBarWords,x.key_words)
            })
          .some(x => { return x == true})  
        return serchBarServiceMatching
      }, this)
    console.log('messages filterd')
  }
 
  checkSerchBarMatching(searchBarWords, keywordsSet)
  {
    let serviceMatched = true
    for (let searchWord of searchBarWords) {
      //service.service_id = '0'
      let keywords = keywordsSet.split(';').map(x => { return x.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, "") })
      let keywordMatched = false;
      for (let keyword of keywords) {
        if ((keyword + 's').indexOf(searchWord) > -1 /* || searchWord.indexOf(keyword) > -1 */ ) {
          keywordMatched = true
        }
      }
      if (keywordMatched == false) {
        serviceMatched = false
        break
      }
    }
    return serviceMatched
  } 

  /*
  initializeSearchServiceList() {
    let _this = this
    this.searchServiceService
      .getServices2()
      .subscribe(data => {
        _this.searchServiceModel.services = data;
        let a = 0
      });
  }
  */



  clickItem(event, selectedService) {
    event.stopPropagation();
    this.nav.push(FeedPage, {category: selectedService});
    let a = 0
  }

}
