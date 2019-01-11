import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, SegmentButton, App, NavParams } from 'ionic-angular';
import { FollowersPage } from '../followers/followers';
import { SettingsPage } from '../settings/settings';
import { ProfileModel } from './profile.model';
import { ProfileService } from './profile.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import 'rxjs/Rx';
//..
import { MapsPage } from '../../pages/maps/maps';
import { GoogleMap } from '../../components/google-map/google-map';
import { GoogleMapsService } from "../../pages/maps/maps.service";
import { MapsModel, MapPlace } from "../../pages/maps/maps.model";

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
  
  display: string;
  profile: ProfileModel = new ProfileModel();
  tabselection: string = 'map';
  
   
  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public profileService: ProfileService,
    public socialSharing: SocialSharing,
    public mapsPage: MapsPage) {
    
      this.display = "list";
  }

  ngOnInit() {
    let a=0
  }

  ionViewDidLoad() {
    this.profileService.getData()
      .then(data => {
        this.profile.user = data.user;
        this.profile.following = data.following;
        this.profile.followers = data.followers;
        this.profile.posts = data.posts;
      });
  }

  goToFollowersList() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(FollowersPage, {
      list: this.profile.followers
    });
  }

  goToFollowingList() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(FollowersPage, {
      list: this.profile.following
    });
  }

  goToSettings() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(SettingsPage);
  }

  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    console.log('Tab selected', segmentButton.value);
    this.tabselection = segmentButton.value
  }

  sharePost(post) {
   //this code is to use the social sharing plugin
   // message, subject, file, url
   this.socialSharing.share(post.description, post.title, post.image)
   .then(() => {
     console.log('Success!');
   })
   .catch(() => {
      console.log('Error');
   });
  }

}
