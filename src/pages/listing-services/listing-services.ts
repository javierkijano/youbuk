import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, SegmentButton } from 'ionic-angular';

import 'rxjs/Rx';

import { ListingServicesModel } from './listing-services.model';
import { ListingServicesService } from './listing-services.service';

@Component({
  selector: 'listing-services-page',
  templateUrl: 'listing-services.html'
})
export class ListingServicesPage {
  listingServicesModel: ListingServicesModel = new ListingServicesModel();
  loading: any;
  selectedService: any;
  tabselection: string = 'services'
  display: string = 'list'

  constructor(
    public nav: NavController,
    public listingServicesService: ListingServicesService,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.loading = this.loadingCtrl.create();
    this.selectedService = navParams.get("selectedService");
    
  }

  ionViewDidLoad() {
    this.loading.present();
    this.listingServicesService
      .getData()
      .then(data => {
        this.listingServicesModel.items = data.items;
        this.loading.dismiss();
      });
  }

  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
    this.tabselection = segmentButton.value
  }


}
