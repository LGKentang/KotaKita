export interface User {
  id: number;
  email: string;
  name: string;
  instituteId?: number;
  dob?: Date;
  phoneNumber?: string;
  profilePic?: string;
  role?: string;
}

export interface NewUser extends Omit<User, 'id'> {
  password: string;
}
