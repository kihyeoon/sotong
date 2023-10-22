import PostGridCard from "@/components/PostGridCard";
import GridSpinner from "@/components/ui/GridSpinner";
import { SimplePost } from "@/model/post";
import useSWR from "swr";

interface Props {
  username: string;
  query: string;
}

export default function PostGrid({ username, query }: Props) {
  const { data: posts, isLoading } = useSWR<SimplePost[]>(
    `/api/user/${username}/${query}`
  );

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
