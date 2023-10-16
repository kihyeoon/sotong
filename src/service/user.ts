import { ProfileUser, SearchUser } from "@/model/user";
import { client } from "@/service/sanity";

interface OAuthUser {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
}

export async function addUser({ id, email, name, username, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    email,
    name,
    username,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(`
    *[_type == "user" && username == "${username}"][0]{
    ...,
    "id":_id,
    following[]->{username, image},
    followers[]->{username, image},
    "bookmarks":bookmarks[]->_id
  }`);
}

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& username match "${keyword}*" || name match "${keyword}*"`
    : "";
  return client
    .fetch<SearchUser[]>(
      `*[_type == "user" ${query}]{
      ...,
      "following":count(following),
      "followers":count(followers),
      }`
    )
    .then((users) =>
      users.map((user) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client.fetch<ProfileUser>(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "following":count(following),
      "followers":count(followers),
      "id":_id,
      "posts": count(*[_type == "post" && author->username == "${username}"]),
      }`
  ).then((user) => (
    user ? {
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    } : null
  ))
}