import { DocumentReference } from '@angular/fire/firestore';

export interface Rating {
  rating: number;
  user: DocumentReference;
}
