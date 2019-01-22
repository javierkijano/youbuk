import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { ListingModel, ListingItemModel } from './listing.model';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ListingService {

  listingData: Observable<any[]> 
  
  constructor(
    public http: Http,
    private fireStore: AngularFirestore) {}

  /*
  getData(): Promise<ListingModel> {
    return this.http.get('./assets/example_data/listing.json')
     .toPromise()
     .then(response => response.json() as ListingModel)
     .catch(this.handleError);
  }
  */
  getCategories(): Observable<ListingItemModel[]> {
    return this.fireStore.collection<any>('CATEGORIES')
      .valueChanges()
      .map(x => {
        return x.map( x => {
          return x as ListingItemModel
          })
        }
      )
      .catch(this.handleError);
  }

  getPopulars(): Observable<ListingItemModel[]> {
    return this.fireStore.collection<any>('CATEGORIES')
    .valueChanges()
    .map(x => {
      return x.map( x => {
        x.image = "./assets/images/categories-listing/" + x.image
        return x as ListingItemModel
        })
      }
    )
      .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
