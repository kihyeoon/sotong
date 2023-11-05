"use client";
import Button from "@/components/ui/Button";
import useMe from "@/hooks/me";
import { ProfileUser } from "@/model/user";

export default function FollowButton({ user }: { user: ProfileUser }) {
  const { username } = user;
  const { user: loggedInUser } = useMe();

  const showButton = loggedInUser && loggedInUser.username !== username;
  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  const text = isFollowing ? "Unfollow" : "Follow";

  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} isRed={text === "Unfollow"} />
      )}
    </>
  );
}
