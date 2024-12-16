export interface Comment {
    id: number;
    message: string;
    created_at: string | null;
    name: string; // User's name
    profile_picture_url: string | null; // User's profile picture URL
  }
  