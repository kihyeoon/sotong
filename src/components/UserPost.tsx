"use client";
import PostGrid from "@/components/PostGrid";
import { BookmarkIcon, HeartIcon, PostIcon } from "@/components/ui/icons";
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
      <ul>
        {tabs.map(({ type, icon }) => {
          const isActive = query === type;
          return (
            <li key={type}>
              <button
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  isActive ? "bg-gray-200" : ""
                }`}
                onClick={() => setQuery(type)}
              >
                {icon}
              </button>
              <span>{type}</span>
            </li>
          );
        })}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  );
}
