import { Comment, FullPost } from "@/model/post";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";

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

  const { mutate: globalMutate } = useSWRConfig();

  const postComment = useCallback(
    (comment: Comment) => {
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
      }).then(() => {
        globalMutate(POST_URL);
      });
    },
    [post, mutate, globalMutate]
  );

  return {
    post,
    isLoading,
    isError: error,
    postComment,
  };
}
