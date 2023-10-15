import { FullPost, SimpplePost } from "@/model/post";
import useSWR from "swr";

export default function PostDetail({ post }: { post: SimpplePost }) {
  const { id, userImage, username, image, createdAt, likes, text } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  console.log(data);

  return <div>PostDetail</div>;
}
