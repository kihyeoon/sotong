"use client";

import GridSpinner from "@/components/ui/GridSpinner";
import { ProfileUser } from "@/model/user";
import { FormEvent, useState } from "react";
import useSWR from "swr";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);
  console.log("data", users);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searching for", keyword);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus
          placeholder="Search for a user by name or username"
        />
      </form>
      {error && <p>Error: {error.message}</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <p>{user.name}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
