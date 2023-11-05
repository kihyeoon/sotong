import ActionBar from "@/components/ActionBar";
import Avatar from "@/components/Avatar";
import CommentForm from "@/components/CommentForm";
import PostUserAvatar from "@/components/PostUserAvatar";
import { FullPost, SimplePost } from "@/model/post";
import Image from "next/image";
import useSWR from "swr";

export default function PostDetail({ post }: { post: SimplePost }) {
  const { id, userImage, username, image, createdAt, likes, text } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  const handlePostComment = (comment: string) => {
    console.log(comment);
  };

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="w-full flex flex-col basis-2/5">
        <PostUserAvatar userImage={userImage} username={username} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {comments &&
            comments.map(
              ({ userImage, username: commentUsername, comment }, index) => (
                <li key={index} className="flex items-center mb-1">
                  <Avatar
                    image={userImage}
                    size="small"
                    highlight={commentUsername === username}
                  />
                  <div className="ml-2">
                    <span className="font-semibold mr-1">
                      {commentUsername}
                    </span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} />
        <CommentForm onPostComment={handlePostComment} />
      </div>
    </section>
  );
}
