import PostDetail from "@/components/PostDetail";
import PostModal from "@/components/PostModal";
import ModalPortal from "@/components/ui/ModalPortal";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";

interface Props {
  post: SimplePost;
  priority: boolean;
}

export default function PostGridCard({ post, priority = false }: Props) {
  const { image, username } = post;
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Image
        src={image}
        alt={`photh by ${username}`}
        fill
        sizes="650px"
        priority={priority}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </>
  );
}
