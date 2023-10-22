"use client";

import PostListCard from "@/components/PostListCard";
import GridSpinner from "@/components/ui/GridSpinner";
import { SimplePost } from "@/model/post";
import useSWR from "swr";

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");

  return (
    <div>
      {isLoading && (
        <div className="text-center mt-32">
          <GridSpinner color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className="mb-4">
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
