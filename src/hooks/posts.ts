import { Comment, SimplePost } from "@/model/post";
import useSWR from "swr";

const POST_URL = "/api/posts";
const LIKE_URL = "/api/likes";
const COMMENT_URL = "/api/comments";

async function updateLike(id: string, like: boolean) {
  return fetch(LIKE_URL, {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch(COMMENT_URL, {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function usePost() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(POST_URL);

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((name) => name !== username),
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  const postComment = (post: SimplePost, { comment }: Comment) => {
    const newPost = {
      ...post,
      comments: post.comments + 1,
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(addComment(post.id, comment), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return {
    posts,
    isLoading,
    isError: error,
    setLike,
    postComment,
  };
}
