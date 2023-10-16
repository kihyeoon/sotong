"use client";

import UserCard from "@/components/UserCard";
import GridSpinner from "@/components/ui/GridSpinner";
import useDebounce from "@/hooks/useDebounce";
import { SearchUser } from "@/model/user";
import { FormEvent, useState } from "react";
import useSWR from "swr";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searching for", keyword);
  };

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          className="w-full border border-gray-400 rounded-md p-3 text-xl"
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
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
