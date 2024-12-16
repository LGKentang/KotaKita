import type { User } from './user.type';

export interface Post {
  id: number;
  slug: string;
  title: string;
  userId: number;
  img: string;
  desc: string;
  status: string;
  instituteId?: number;
  submissionDate: string;
  user?: User;
  upvotes: number[];
}
