"use client";
import Button from "@/components/ui/Button";
import useMe from "@/hooks/me";
import { ProfileUser } from "@/model/user";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";

export default function FollowButton({ user }: { user: ProfileUser }) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  const text = isFollowing ? "Unfollow" : "Follow";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !isFollowing);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            text={text}
            onClick={handleFollow}
            isRed={text === "Unfollow"}
            disabled={isUpdating}
          />
        </div>
      )}
    </>
  );
}
