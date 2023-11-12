"use client";
import Button from "@/components/ui/Button";
import useMe from "@/hooks/me";
import { ProfileUser } from "@/model/user";
import { follow } from "@/service/user";

export default function FollowButton({ user }: { user: ProfileUser }) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();

  const showButton = loggedInUser && loggedInUser.username !== username;
  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  const text = isFollowing ? "Unfollow" : "Follow";

  const handleFollow = () => {
    toggleFollow(user.id, !isFollowing);
  };

  return (
    <>
      {showButton && (
        <Button
          text={text}
          onClick={handleFollow}
          isRed={text === "Unfollow"}
        />
      )}
    </>
  );
}
