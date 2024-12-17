export interface Project {
  id: number;
  slug: string;
  title: string;
  instituteId: number;
  img: string;
  submissionDate: string;
  status: 'Active' | 'Pending Review' | 'Closed';
  desc: string;
  upvotes: number[];
}
