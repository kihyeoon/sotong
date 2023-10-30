import { SimplePost } from "@/model/post";
import useSWR, { useSWRConfig } from "swr";

const API_URL = "/api/posts";

export default function usePost() {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>(API_URL);
  const { mutate } = useSWRConfig();

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    fetch(API_URL, {
      method: "PUT",
      body: JSON.stringify({ id: post.id, like }),
    }).then(() => mutate("/api/posts"));
  };

  return {
    posts,
    isLoading,
    isError: error,
    setLike,
  };
}
