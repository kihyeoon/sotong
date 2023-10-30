"use client";

import PostListCard from "@/components/PostListCard";
import GridSpinner from "@/components/ui/GridSpinner";
import usePost from "@/hooks/post";

export default function PostList() {
  const { posts, isLoading } = usePost();

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
