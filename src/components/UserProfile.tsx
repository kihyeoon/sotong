import { ProfileUser } from "@/model/user";

export default function UserProfile({user}: {user: ProfileUser}) {
  return (
    <p>{user.username}</p>
  )
}
