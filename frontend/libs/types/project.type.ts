import type { User } from './user.type';

export interface Project {
  id: number;
  slug: string;
  title: string;
  userId: number;
  img: string;
  submissionDate: string;
  status: 'Active' | 'Pending Review' | 'Closed';
  desc: string;
  user?: User;
  upvotes: number[];
}
