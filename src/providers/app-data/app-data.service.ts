import { Injectable, OnInit } from "@angular/core";
import { Http } from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import 'rxjs/add/operator/toPromise';

import { combineLatest, pipe, of, defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators'

import { CategoriesItemModel, CategoriesModel, SubcategoriesItemModel, SubcategoriesModel, ServicesItemModel, ServicesModel, PopularsItemModel, PopularsModel } from './app-data.model'
import { Observable } from 'rxjs'



@Injectable(/* only angular 6+ {providedIn: 'root'}*/)
export class AppDataService {

  categoriesModel: CategoriesModel = new CategoriesModel();
  categoriesModel_loaded: Promise<Boolean>;

  subcategoriesModel: SubcategoriesModel = new SubcategoriesModel();
  subcategoriesModel_loaded: Promise<Boolean>;
  
  popularsModel: PopularsModel = new PopularsModel();
  popularsModel_loaded: Promise<Boolean>;

  servicesModel: ServicesModel = new ServicesModel();
  servicesModel_loaded: Promise<Boolean>;
  
  constructor(
    public http: Http,
    private fireStore: AngularFirestore) {

    let _this = this
    
    // remember it is not possible to have ngOnInit in services

    // enable persistence
    /*
    fireStore.firestore
      .enablePersistence()
      .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
      });
    */

    // disable persitence
    /*
    firebase.firestore().disableNetwork()
      .then(function() {
        // Do offline actions
        // ...
    });
    */


    //load categories model
    _this.getCategories().subscribe(
      x => { 
        _this.categoriesModel.categories = x},
      err => { console.log('Error: %s', err)},
      () => { _this.categoriesModel_loaded = Promise.resolve(true); console.log('Completed')})

    //load subcategories model
    _this.getSubcategories().subscribe(
      x => { _this.subcategoriesModel.subcategories = x},
      err => { console.log('Error: %s', err)},
      () => { _this.subcategoriesModel_loaded = Promise.resolve(true); console.log('Completed')})

    //load service model
    _this.getServices().subscribe(
      x => { _this.servicesModel.services = x},
      err => { console.log('Error: %s', err)},
      () => { _this.servicesModel_loaded = Promise.resolve(true); console.log('Completed')})
    
    //load popular model
    _this.getCategories().subscribe(
      x => { _this.popularsModel.populars = x},
      err => { console.log('Error: %s', err)},
      () => { _this.popularsModel_loaded = Promise.resolve(true); console.log('Completed')})

  }

  // get categories info (cache or firestore)
  public getCategoriesModel() {
    return this.categoriesModel
  }

  // get subcategories info (cache or firestore)
  public getSubcategoriesModel() {
    return this.subcategoriesModel
  }

  // get populars info (cache or firestore)
  public getPopularsModel() {
    return this.popularsModel
  }
  

  // get services info (cache or firestore)
  public getServicesModel() {
    return this.servicesModel
  }


  

  // get categories
  private getCategories() {
    return this.fireStore.collection<any>('CATEGORIES')
      .valueChanges()
      .map(x => {
        return x.map( x => {
          x.image = "./assets/images/categories-listing/" + x.image
          return x as CategoriesItemModel
          })
        }
      )
      .catch(this.handleError);
  }

  private getSubcategories() {
    return this.fireStore.collection<any>(
        'SUBCATEGORIES')
      .valueChanges()
      .map(x => {
        return x.map( x => {
          x.image = "./assets/images/subcategories-listing/" + x.image
          return x as SubcategoriesItemModel
          })
        }
      )
      .catch(this.handleError);
  }

  private getPopulars() {
    return this.fireStore.collection<any>('POPULARS')
    .valueChanges()
    .map(x => {
      return x.map( x => {
        return x as PopularsItemModel
        })
      }
    )
    .catch(this.handleError);
  }


  // get services
  private getServices() {
    let services$ = this.fireStore.collection('SERVICES').valueChanges()
    let servicesWithKeywords$ = services$
      .pipe(leftJoin(this.fireStore, 'service_id', 'SERVICES_KEYWORDS'))
      .map((x: any) => {
        return x.map( x => {
          let y = x as ServicesItemModel
          y.serviceSelected = true
          return y
          })
        })
    return servicesWithKeywords$
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

export const leftJoin = (
  afs: AngularFirestore,
  field,
  collection//,
  //limit = 100
) => {
  return source =>
    defer(() => {
      // Operator state
      let collectionData;
      // Track total num of joined doc reads
      let totalJoins = 0;
      return source.pipe(
        switchMap(data => {
          // Clear mapping on each emitted val ;
          // Save the parent data state
          collectionData = data as any[];
          const reads$ = [];
          for (const doc of collectionData) {
            // Push doc read to Array
            if (doc[field]) {
              // Perform query on join key, with optional limit
              const q = ref => ref.where(field, '==', doc[field])//.limit(limit);
              reads$.push(afs.collection(collection, q).valueChanges());
            } else {
              reads$.push(of([]));
            }
          }

          return combineLatest(reads$);
        }),
        map(joins => {
          return collectionData.map((v, i) => {
            totalJoins += joins[i].length;
            return { ...v, [collection]: joins[i] || null };
          });
        }),
        tap(final => {
          console.log(
            `Queried ${(final as any).length}, Joined ${totalJoins} docs`
          );
          totalJoins = 0;
        })
      );
    });
};