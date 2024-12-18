export interface User {
  id: number;
  email: string;
  name: string;
  institute_id?: number;
  date_of_birth?: Date;
  phone_number?: string;
  profile_picture_url?: string;
  role?: string;
}

export interface NewUser extends Omit<User, 'id'> {
  password: string;
}
