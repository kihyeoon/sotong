"use client";

import ActionBar from "@/components/ActionBar";
import PostDetail from "@/components/PostDetail";
import PostModal from "@/components/PostModal";
import PostUserAvatar from "@/components/PostUserAvatar";
import ModalPortal from "@/components/ui/ModalPortal";
import usePost from "@/hooks/posts";
import { Comment, SimplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";

interface Props {
  post: SimplePost;
  priority?: boolean;
}

export default function PostListCard({ post, priority }: Props) {
  const { userImage, username, image, createdAt, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePost();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <PostUserAvatar userImage={userImage} username={username} />
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        width={500}
        height={500}
        alt={`photo by ${username} at ${createdAt}`}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p>
          <span className="font-bold mr-1">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className="font-bold my-2 text-sky-500"
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
