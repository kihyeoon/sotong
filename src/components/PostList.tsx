"use client";

import PostListCard from "@/components/PostListCard";
import { SimpplePost } from "@/model/post";
import { GridLoader } from "react-spinners";
import useSWR from "swr";

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimpplePost[]>("/api/posts");

  return (
    <div>
      {isLoading && (
        <div className="text-center mt-32">
          <GridLoader color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4">
              <PostListCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
