import { useCallback } from "react";
import { HomeUser } from "@/model/user";
import useSWR from "swr";

const ME_URL = "/api/me";
const BOOKMARK_URL = "/api/bookmarks";
const FOLLOW_URL = "/api/follow";

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch(BOOKMARK_URL, {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

async function updateFollow(targetId: string, follow: boolean) {
  return fetch(FOLLOW_URL, {
    method: "PUT",
    body: JSON.stringify({ id: targetId, follow }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>(ME_URL);

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;
      const bookmarks = user.bookmarks;
      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((id) => id !== postId),
      };

      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [mutate, user]
  );

  const toggleFollow = useCallback(
    (targetId: string, follow: boolean) => {
      return mutate(updateFollow(targetId, follow), { populateCache: false });
    },
    [mutate]
  );

  return {
    user,
    isLoading,
    isError: error,
    setBookmark,
    toggleFollow,
  };
}
