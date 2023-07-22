import { Comment } from './comment';
import { Rating } from './rating';

export interface Album {
  album: string;
  band: string;
  commentList: Comment[];
  image: string;
  ratingList: Rating[];
}
