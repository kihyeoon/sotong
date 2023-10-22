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

  console.log("posts", posts);
  return (
    <>
      {isLoading && <GridSpinner />}
      <ul>
        {posts?.map((post: any, index) => {
          return (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
