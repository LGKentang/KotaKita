import type { User } from './user.type';

export interface Project {
  id: number;
  slug: string;
  title: string;
  userId: number;
  img: string;
  desc: string;
  user?: User;
  upvotes: number[];
}
