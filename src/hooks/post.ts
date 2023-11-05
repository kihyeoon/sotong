import { Comment, FullPost } from "@/model/post";
import useSWR from "swr";

const POST_URL = "/api/posts";
const COMMENT_URL = "/api/comments";

async function addComment(id: string, comment: string) {
  return fetch(COMMENT_URL, {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`${POST_URL}/${postId}`);

  const postComment = (comment: Comment) => {
    if (!post) return;
    const newPost = {
      ...post,
      comments: [...post.comments, comment],
    };

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return {
    post,
    isLoading,
    isError: error,
    postComment,
  };
}
