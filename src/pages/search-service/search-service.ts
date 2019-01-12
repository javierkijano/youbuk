import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
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
  services: any
  searchControl: FormControl
  searching: boolean
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
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
    this.initializeServiceList()
    this.setFilteredServices()
    this.searching = false;
    let _this = this
    this.searchControl.valueChanges.debounceTime(700).subscribe(
      () => {
        _this.searching = true
      }
    );
  }

  onSearchInput(event)
  {
    if (event.data == null) {
      this.initializeServiceList()
    }
    if (this.searching == true)
    {
      this.setFilteredServices()
    }
    this.searching = false
  }

  onSearchByKeywordCancel(event)
  {
    this.searching = true
    this.initializeServiceList()
    this.setFilteredServices()
    this.searching = false

  }

  onSearchByKeywordClear(event)
  {
    this.searching = true
    this.initializeServiceList()
    this.setFilteredServices()
    this.searching = false
  }


  setFilteredServices() {//event) {
 
    this.services = this.filterServices(this.searchBarText)

  }

  filterServices(searchBarText) {
    return this.services.filter((service) => {
      return service.title.toLowerCase().indexOf(searchBarText.toLowerCase()) > -1;
    });
  }


  initializeServiceList() {
    this.services = [
      {title: 'cuidado de personas mayores'},
      {title: 'cuidado de animales'},
      {title: 'canguro de niños'},
      {title: 'reparación de lavadora'},
      {title: 'reparación de frigorifico'},
      {title: 'endodoncia'},
      {title: 'electricista'},
      {title: 'sastre'}
    ] 
  }

  


}
