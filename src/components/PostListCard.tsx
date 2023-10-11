import Avatar from "@/components/Avatar";
import BookmarkIcon from "@/components/ui/icons/BookmarkIcon";
import HeartIcon from "@/components/ui/icons/HeartIcon";
import SmileIcon from "@/components/ui/icons/SmileIcon";
import { SimpplePost } from "@/model/post";
import { parseDate } from "@/util/date";
import Image from "next/image";

export default function PostListCard({ post }: { post: SimpplePost }) {
  const { userImage, username, image, createdAt, likes, text } = post;

  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        <Avatar image={userImage} size="medium" highlight />
        <span className="text-gray-900 font-bold ml-2">{username}</span>
      </div>
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        width={500}
        height={500}
        alt={`photo by ${username} at ${createdAt}`}
      />
      <div className="flex justify-between my-2 px-4">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        <p>
          <span className="font-bold mr-1">{username}</span>
          {text}
        </p>
        <p className="text-sm text-neutral-500 my-2">{parseDate(createdAt)}</p>
        <form className="flex items-center border-t border-neutral-300">
          <SmileIcon />
          <input
            className="w-full ml-2 border-none outline-none p-3 bg-transparent"
            type="text"
            placeholder="Add a comment..."
          />
          <button className="font-semibold text-sky-500">Post</button>
        </form>
      </div>
    </article>
  );
}
