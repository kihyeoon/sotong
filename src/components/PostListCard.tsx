"use client";

import ActionBar from "@/components/ActionBar";
import Avatar from "@/components/Avatar";
import CommentForm from "@/components/CommentForm";
import PostDetail from "@/components/PostDetail";
import PostModal from "@/components/PostModal";
import PostUserAvatar from "@/components/PostUserAvatar";
import ModalPortal from "@/components/ui/ModalPortal";
import { SimpplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";

interface Props {
  post: SimpplePost;
  priority?: boolean;
}

export default function PostListCard({ post, priority }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
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
      <ActionBar
        username={username}
        text={text}
        createdAt={createdAt}
        likes={likes}
      />
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
