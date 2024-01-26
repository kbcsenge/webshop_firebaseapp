import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Review } from "../models/Review";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ReviewService{

    private reviewCollection: AngularFirestoreCollection<Review>;
    private reviews: Observable<Review[]>;

    constructor(
        private afs: AngularFirestore
        ) {
        this.reviewCollection = afs.collection<Review>('Reviews');
        this.reviews = this.reviewCollection.valueChanges({ idField: 'id' });
      }
    

     getReviews(productId: string): Observable<Review[]>{
        return this.afs.collection<Review>('Reviews', ref => ref.where('productId', '==', productId)).valueChanges({idField: 'id'});

    }

    addReview(review: Review){
        return this.afs.collection<Review>('Reviews').add(review);
    }


    deleteReview(reviewId: string){
        return this.reviewCollection.doc(reviewId).delete();
    }

    updateReview(review: Review){
        return this.reviewCollection.doc(review.id).update({
            "rating":  review.rating,
            "comment": review.comment
        });
    }


}


