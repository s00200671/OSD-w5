import { People } from '../model/people.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PeopleStore, PeopleState } from '../store/people.store';
import { EntityStore, EntityState } from '@datorama/akita'; 

@Injectable()
export class PeopleService {
  http: HttpClient;
  // create your own mock api addressbook containing
  // id, lastname, firstname, phone
  apiURL="https://620e616c585fbc3359e05f1a.mockapi.io";


  store : PeopleStore;


  constructor(http: HttpClient, store: PeopleStore) {
   this.http = http;
   this.store = store;
  }

  getAllPeople(): Observable<People[]> {
    return this.http.get<People[]>(this.apiURL+'/api/vi/people?sortBy=lastname')
      .pipe(
        tap(people => this.store.loadPeople(people, true)
        ));
  }

  createPerson(people: People): Observable<People> {
    return this.http.post<People>(this.apiURL+'/api/vi/people', people).pipe(
      tap(person => {
        this.store.add([person]) 
      })
    );
  }

  deletePerson(personId: string): Observable<any> {
    return this.http.delete(this.apiURL+'/api/vi/people/' + personId).pipe(
      tap(result => {
        this.store.remove(personId);
      })
    );
  }

  updatePerson(personId: string, person: People): Observable<any> {
    return this.http.put(this.apiURL+'/api/vi/people/' + personId, person).pipe(
      tap(result => {
        this.store.update(personId, person);
      })
    );
  }
}
