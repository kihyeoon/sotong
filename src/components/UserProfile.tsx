import Avatar from "@/components/Avatar";
import FollowButton from "@/components/ui/FollowButton";
import { ProfileUser } from "@/model/user";

export default function UserProfile({ user }: { user: ProfileUser }) {
  const { image, username, name, followers, following, posts } = user;
  const info = [
    {
      title: "Posts",
      data: posts,
    },
    {
      title: "Followers",
      data: followers,
    },
    {
      title: "Following",
      data: following,
    },
  ];
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 border-b border-neutral-300">
      <Avatar image={image} highlight size="xlarge" />
      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col items-center md:flex-row">
          <h1 className="text-2xl md:mr-8 my-2 md:mb-0">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="my-4 flex gap-4">
          {info.map(({ title, data }) => (
            <li key={title}>
              <span className="font-bold mr-1">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-center md:text-start">{name}</p>
      </div>
    </section>
  );
}
