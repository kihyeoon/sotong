"use client";

import PostListCard from "@/components/PostListCard";
import { SimpplePost } from "@/model/post";
import { GridLoader } from "react-spinners";
import useSWR from "swr";

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimpplePost[]>("/api/posts");
  console.log(posts);
  return (
    <div>
      {isLoading && <GridLoader color="red" />}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <PostListCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
