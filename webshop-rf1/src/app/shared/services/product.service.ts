import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.productsCollection = afs.collection<Product>('Products');
    this.products = this.productsCollection.valueChanges({
      idField: 'productId',
    });
  }

  //CRUD
  getAllProducts(): Observable<Product[]> {
    return this.products;
  }

  getProductImageUrl(imageUrl: string): Observable<string> {
    const storageRef = this.storage.ref(imageUrl);
    return storageRef.getDownloadURL();
  }
  getProductById(id: string): Observable<Product | undefined> {
    return this.afs
      .collection<Product>('Products')
      .doc(id)
      .valueChanges({ idField: 'productId' });
  }

  createProduct(product: Product) {
    return this.afs.collection<Product>('Products').add(product);
  }

  capitalizeFirstLetter(str: string): string {
    const word = str.charAt(0).toUpperCase() + str.slice(1);
    return word;
  }
  getAllProductBySearchTerm(searchTerm: string): Observable<Product[]> {
    const capitalizedSearchTerm = this.capitalizeFirstLetter(searchTerm);
    const startAt = capitalizedSearchTerm;
    const endAt = capitalizedSearchTerm + '\uf8ff';

    return this.afs
      .collection<Product>('Products', (ref) =>
        ref
          .where('productName', '>=', startAt)
          .where('productName', '<=', endAt)
          .orderBy('productName')
          .limit(5)
      )
      .valueChanges({ idField: 'productId' });
  }

  getAllProductByTag(tag: string): Observable<Product[]> {
    return this.afs
      .collection<Product>('Products')
      .valueChanges({ idField: 'productId' })
      .pipe(
        map((products: Product[]) =>
          products.filter((product) =>
            tag === 'All' ? true : product.tags?.includes(tag)
          )
        )
      );
  }

  async deleteProductById(productId: String) {
    return await this.afs.doc(`Products/${productId}`).delete();
  }

  updateProduct(product: Product) {
    return this.productsCollection.doc(String(product.productId)).update({
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      tags: product.tags,
      description: product.description,
      imageUrl: product.imageUrl,
    });
  }
}
