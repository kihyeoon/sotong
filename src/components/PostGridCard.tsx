import PostDetail from "@/components/PostDetail";
import PostModal from "@/components/PostModal";
import ModalPortal from "@/components/ui/ModalPortal";
import { SimplePost } from "@/model/post";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  post: SimplePost;
  priority: boolean;
}

export default function PostGridCard({ post, priority = false }: Props) {
  const { image, username } = post;
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const handdleOpenPost = () => {
    if (!session?.user) return signIn();
    setOpenModal(true);
  };

  return (
    <div className="relative w-full aspect-square">
      <Image
        className="object-cover"
        src={image}
        alt={`photh by ${username}`}
        fill
        sizes="650px"
        priority={priority}
        onClick={handdleOpenPost}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
