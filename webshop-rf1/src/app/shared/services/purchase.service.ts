import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Purchase } from '../models/Purchase';
import { Observable } from 'rxjs';
import { ref } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private afs: AngularFirestore) {}

  getPurchasesByCustomerId(customerId: string): Observable<Purchase[]> {
    return this.afs.collection<Purchase>('Purchases', ref=>ref.where("customerId","==",customerId)).valueChanges();
  }
}
