"use client";
import { ProfileUser } from "@/model/user";
import { useState } from "react";
import useSWR from "swr";

export default function UserPost({ user }: { user: ProfileUser }) {
  const [tab, setTab] = useState("posts");
  const { data, isLoading, error } = useSWR(
    `/api/user/${user.username}/${tab}`
  );

  console.log("UserPost.tsx: data", data);
  return <></>;
}
