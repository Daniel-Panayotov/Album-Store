import { Comment } from './comment';
import { Rating } from './rating';

export interface Album {
  albumName: string;
  band: string;
  commentList: Comment[];
  image: string;
  ratingList: Rating[];
  uid: string;
}
