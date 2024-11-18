export interface User {
  id: number;
  email: string;
  userProfile?: UserProfile;
}

export interface UserProfile {
  id: number;
  profilePic: string;
  fullName: string;
  userId: number;
}

export interface NewUser extends Omit<User, 'userProfile' | 'id'> {
  password: string;
}
