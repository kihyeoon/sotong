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
    <section>
      <Avatar image={image} highlight />
      <div>
        <h1>{username}</h1>
        <FollowButton user={user} />
        <ul>
          {info.map(({ title, data }) => (
            <li key={title}>
              <span>{data}</span>
              <span>{title}</span>
            </li>
          ))}
        </ul>
        <p>{name}</p>
      </div>
    </section>
  );
}
