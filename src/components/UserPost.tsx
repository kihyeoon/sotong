"use client";
import PostGrid from "@/components/PostGrid";
import { BookmarkIcon, HeartIcon, PostIcon } from "@/components/ui/icons";
import { CacheKeysContext } from "@/context/CacheKeysContext";
import { ProfileUser } from "@/model/user";
import { useState } from "react";

const tabs = [
  { type: "posts", icon: <PostIcon /> },
  { type: "saved", icon: <BookmarkIcon className="w-3 h-3" /> },
  { type: "liked", icon: <HeartIcon className="w-3 h-3" /> },
];

export default function UserPost({
  user: { username },
}: {
  user: ProfileUser;
}) {
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase">
        {tabs.map(({ type, icon }) => {
          const isActive = query === type;
          return (
            <li
              key={type}
              onClick={() => setQuery(type)}
              className={`mx-12 p-4 cursor-pointer border-black ${
                isActive && "font-bold border-t"
              }`}
            >
              <button className="scale-150 md:scale-100">{icon}</button>
              <span className="hidden md:inline">{type}</span>
            </li>
          );
        })}
      </ul>
      <CacheKeysContext.Provider
        value={{ postKey: `/api/user/${username}/${query}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
