import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { ServiceItemModel } from './search-service.model';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SearchServiceService {

  
  constructor(
    public http: Http,
    private fireStore: AngularFirestore) {}

  getServices(): Observable<ServiceItemModel[]> {
    let a = 0
    return this.fireStore.collection<any>('SERVICES')
      .valueChanges()
      .map(x => {
        return x.map( x => {
          let y = x as ServiceItemModel
          y.serviceSelected = true
          return x as ServiceItemModel
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
