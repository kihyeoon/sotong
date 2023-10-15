import BookmarkIcon from "@/components/ui/icons/BookmarkIcon";
import HeartIcon from "@/components/ui/icons/HeartIcon";
import { parseDate } from "@/util/date";

interface Props {
  username: string;
  createdAt: string;
  likes: string[];
  text?: string;
}

export default function ActionBar({ username, text, createdAt, likes }: Props) {
  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <HeartIcon />
        <BookmarkIcon />
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
