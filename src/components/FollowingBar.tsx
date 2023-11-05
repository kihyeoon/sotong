"use client";
import Avatar from "@/components/Avatar";
import ScrollableBar from "@/components/ScrollableBar";
import useMe from "@/hooks/me";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";

export default function FollowingBar() {
  const { user, isLoading, isError } = useMe();
  const users = user?.following;

  return (
    <section className="w-full flex justify-center items-center p-4 mb-4 rounded-lg min-h-[119px] overflow-x-auto relative z-0">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>Not following anyone</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className="flex flex-col items-center w-20"
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-ellipsis overflow-hidden text-center">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
