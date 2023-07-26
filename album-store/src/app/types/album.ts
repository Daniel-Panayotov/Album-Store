import { Comment } from './comment';

export interface Album {
  album: string;
  band: string;
  commentList: Comment[];
  image: string;
  id: string;
}
