import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishService {
  public wishListItem : any = []
  public productList = new BehaviorSubject<any>([]);

  constructor() { }


 
}