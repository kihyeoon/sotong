import ToggleBotton from "@/components/ui/ToggleBotton";
import {
  BookmarkFillIcon,
  BookmarkIcon,
  HeartFillIcon,
  HeartIcon,
} from "@/components/ui/icons";
import { SimplePost } from "@/model/post";
import { parseDate } from "@/util/date";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSWRConfig } from "swr";

interface Props {
  post: SimplePost;
}

export default function ActionBar({ post }: Props) {
  const { id, username, text, createdAt, likes } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const liked = user ? likes?.includes(user.username) : false;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { mutate } = useSWRConfig();
  const handleLike = (like: boolean) => {
    fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id, like }),
    }).then(() => mutate("/api/posts"));
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleBotton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleBotton
          toggled={isBookmarked}
          onToggle={setIsBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {text && (
          <p>
            <span className="font-bold mr-1">{username}</span>
            {text}
          </p>
        )}
        <p className="text-sm text-neutral-500 my-2">{parseDate(createdAt)}</p>
      </div>
    </>
  );
}
