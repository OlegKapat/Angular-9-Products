// The second way to send data to dialog

import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "../interfaces/products";

@Injectable({
  providedIn: "root",
})
export class SendItemService {
  sendMethod$: Observable<Product>;
  private sendMethodSubject = new Subject<Product>();

  constructor() {
    this.sendMethod$ = this.sendMethodSubject.asObservable();
  }
  sendDataToForm(data) {
    this.sendMethodSubject.next(data);
  }
}
