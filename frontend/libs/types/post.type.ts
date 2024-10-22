import { User } from "./user.type";

export interface Post {
  id: number;
  title: string;
  userId: number;
  img: string;
  desc: string;
  user?: User;
}
