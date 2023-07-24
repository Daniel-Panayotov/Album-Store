import { DocumentData, DocumentReference } from '@angular/fire/firestore';

export interface Comment {
  comment: string;
  user: DocumentReference;
}

export interface ProcessedComment {
  comment: string;
  user: DocumentData;
}
