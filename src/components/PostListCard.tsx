"use client";

import ActionBar from "@/components/ActionBar";
import Avatar from "@/components/Avatar";
import CommentForm from "@/components/CommentForm";
import PostDetail from "@/components/PostDetail";
import PostModal from "@/components/PostModal";
import PostUserAvatar from "@/components/PostUserAvatar";
import ModalPortal from "@/components/ui/ModalPortal";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";

interface Props {
  post: SimplePost;
  priority?: boolean;
}

export default function PostListCard({ post, priority }: Props) {
  const { userImage, username, image, createdAt, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);

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
      <ActionBar post={post}>
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
      <CommentForm />
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
