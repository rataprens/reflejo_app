
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CantidadHijosProvider {
  
  private emitChange = new Subject<any>();

  changeEmitted$ = this.emitChange.asObservable();

  constructor() {
  }

  emiteChange(change:any){
    this.emitChange.next(change);
  }
}
