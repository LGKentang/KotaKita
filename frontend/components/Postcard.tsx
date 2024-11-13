import { Post } from "@/libs/types/post.type";

type postProps = {
  post: Post;
};

const Postcard = ({ post }: postProps) => {
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.img}</div>
    </div>
  );
};

export { Postcard };
