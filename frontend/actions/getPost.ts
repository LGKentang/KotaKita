import { Post } from "@/libs/types/post.type";

export const getPost = async (page: number, limit: number) => {
  try {
    const url = `http://localhost:8080/petitions?page=${page}&limit=${limit}`;
    const res = await fetch(url);
    const data = (await res.json()) as Post;
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(`An error happened: ${e}`);
  }
};
