import { map, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesCollection: AngularFirestoreCollection;
  private subCategoriesCollection!: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {

    this.categoriesCollection = this.afs.collection("categories");
  }

  getCategory() {
    return this.categoriesCollection.snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        return id;
      })));
  }

  getSubCategory(uid: string) {
    this.subCategoriesCollection = this.afs.collection(`categories/${uid}/sub-category`);
    return this.subCategoriesCollection.snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        return id;
      })));

  }
}
