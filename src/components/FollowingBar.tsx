"use client";
import Avatar from "@/components/Avatar";
import { DetailUser } from "@/model/user";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>("/api/me");
  const user = data?.following;

  return (
    <section>
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!user || user.length === 0) && <p>Not following anyone</p>
      )}
      {user && user.length > 0 && (
        <ul>
          {user.map(({ image, username }) => (
            <li key={username}>
              <Link href={`/user/${username}`}>
                <Avatar image={image} highlight />
                <p>{username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
