import PostGridCard from "@/components/PostGridCard";
import GridSpinner from "@/components/ui/GridSpinner";
import usePost from "@/hooks/posts";

export default function PostGrid() {
  const { posts, isLoading } = usePost();

  return (
    <div className="w-full text-center">
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-4 p-4">
        {posts?.map((post: any, index) => {
          return (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
