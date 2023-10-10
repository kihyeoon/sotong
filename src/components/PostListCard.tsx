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
    <>
      <div>
        <Avatar image={userImage} highlight />
        <span>{username}</span>
      </div>
      <Image
        src={image}
        width={500}
        height={500}
        alt={`photo by ${username} at ${createdAt}`}
      />
      <div>
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div>
        <p>{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        <p>
          <span>{username}</span>
          {text}
        </p>
        <p>{parseDate(createdAt)}</p>
        <form>
          <SmileIcon />
          <input type="text" placeholder="Add a comment..." />
          <button>Post</button>
        </form>
      </div>
    </>
  );
}
