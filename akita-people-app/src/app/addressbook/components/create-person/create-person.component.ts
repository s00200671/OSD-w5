
import { PeopleService } from '../../services/people.service';
import { People } from '../../model/people.model';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Router } from '@angular/router'; 
import { PeopleStore } from '../../store/people.store';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-person',
  templateUrl: 'create-person.component.html'
})
export class CreatePersonComponent  {

  createPersonSub: Subscription;

  constructor(private peopleService: PeopleService, private store: PeopleStore, private router: Router) { }


  onSubmit(submittedForm: { value: { lastname: any; firstname: any; phone: any; }; invalid: any; }) {
    if (submittedForm.invalid) {
      return;
    }
    const people: People = {id: uuid.v4(), lastname: submittedForm.value.lastname,firstname: submittedForm.value.firstname, phone: submittedForm.value.phone};
    this.createPersonSub = this.peopleService.createPerson(people).subscribe(result => {
      this.router.navigateByUrl('/people');
    });
  }
}
