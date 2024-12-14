import type { User } from './user.type';

export interface Post {
  id: number;
  slug: string;
  title: string;
  userId: number;
  img: string;
  desc: string;
  status: 'Active' | 'Pending Review' | 'Closed';
  submissionDate: string;
  user?: User;
  upvotes: number[];
}
