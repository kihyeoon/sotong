"use client";
import Button from "@/components/ui/Button";
import { HomeUser, ProfileUser } from "@/model/user";
import useSWR from "swr";

export default function FollowButton({ user }: { user: ProfileUser }) {
  const { username } = user;
  const { data: loggedInUser } = useSWR<HomeUser>(`/api/me`);

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
