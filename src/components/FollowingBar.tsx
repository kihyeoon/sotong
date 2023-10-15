"use client";
import Avatar from "@/components/Avatar";
import ScrollableBar from "@/components/ScrollableBar";
import { DetailUser } from "@/model/user";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>("/api/me");
  // const user = data?.following;
  const user = data?.following && [
    ...data?.following,
    ...data?.following,
    ...data?.following,
  ];

  return (
    <section className="w-full flex justify-center items-center p-4 mb-4 rounded-lg min-h-[119px] overflow-x-auto relative z-0">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!user || user.length === 0) && <p>Not following anyone</p>
      )}
      {user && user.length > 0 && (
        <ScrollableBar>
          {user.map(({ image, username }) => (
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
