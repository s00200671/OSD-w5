import { Injectable } from '@angular/core';
import { PeopleStore, PeopleState } from './people.store';
import { QueryEntity, QueryConfig, Order } from '@datorama/akita';  

@QueryConfig({
  sortBy: "lastname",
  sortByOrder: Order.ASC
})
@Injectable({
  providedIn: 'root'
})
export class PeopleQuery extends QueryEntity<PeopleState> {

  selectArePeopleLoaded$ = this.select(state => {
    console.log(state.arePeopleLoaded);
    return state.arePeopleLoaded;
  });

  constructor(protected override store: PeopleStore) {
    super(store);
  }
}
