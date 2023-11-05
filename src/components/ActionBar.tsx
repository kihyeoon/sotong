import ToggleBotton from "@/components/ui/ToggleBotton";
import {
  BookmarkFillIcon,
  BookmarkIcon,
  HeartFillIcon,
  HeartIcon,
} from "@/components/ui/icons";
import useMe from "@/hooks/me";
import usePost from "@/hooks/post";
import { SimplePost } from "@/model/post";
import { parseDate } from "@/util/date";

interface Props {
  post: SimplePost;
  children?: React.ReactNode;
}

export default function ActionBar({ post, children }: Props) {
  const { id, createdAt, likes } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePost();

  const liked = user ? likes?.includes(user.username) : false;
  const bookmarked = user ? user.bookmarks?.includes(id) : false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };
  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
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
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {children}
        <p className="text-sm text-neutral-500 my-2">{parseDate(createdAt)}</p>
      </div>
    </>
  );
}
