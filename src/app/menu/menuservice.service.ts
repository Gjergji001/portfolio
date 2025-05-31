import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuserviceService {

  private accordionStateSubject = new BehaviorSubject<boolean>(false);
  accordionState$ = this.accordionStateSubject.asObservable();

  toggleAccordion(): void {
    this.accordionStateSubject.next(!this.accordionStateSubject.value);
  }
}
