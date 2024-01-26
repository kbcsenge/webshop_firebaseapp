import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Tags } from '../models/Tags';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private tagsCollection: AngularFirestoreCollection<Tags>;
  private tags: Observable<Tags[]>;


  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { 
    this.tagsCollection = afs.collection<Tags>('Tags');
    this.tags = this.tagsCollection.valueChanges({
      idField: 'tagId',
    });
  }
  getAllTags(): Observable<Tags[]> {
    return this.tags;
  }
  getTagById(id:string): Observable<Tags | undefined>{

    return this.afs.collection<Tags>("Tags").doc(id).valueChanges({idField: 'tagId'});

  }
  
}
