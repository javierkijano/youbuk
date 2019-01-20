import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { SubcategoriesListingModel, SubcategoriesListingItemModel } from './listing-subcategories.model';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class SubcategoriesListingService {

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

  getSubcategories(category: any): Observable<SubcategoriesListingItemModel[]> {
    return this.fireStore.collection(
      'SUBCATEGORIES',
      ref => ref.where('category_id', '==', category.category_id))
      .valueChanges()
      .map(x => {
        return x.map( x => {
          return x as SubcategoriesListingItemModel
          })
        }
      )
      .catch(this.handleError);
  }

  getPopulars(): Observable<SubcategoriesListingItemModel[]> {
    return this.fireStore.collection<any>('SUBCATEGORIES')
    .valueChanges()
    .map(x => {
      return x.map( x => {
        return x as SubcategoriesListingItemModel
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
