import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createPost, getFollowingPostsOf } from "@/service/post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getFollowingPostsOf(user.username).then((posts) =>
    NextResponse.json(posts)
  );
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const form = await req.formData();
  const text = form.get("text")?.toString();
  const file = form.get("file") as Blob;

  if (!text || !file) {
    return new Response("Missing text or file", { status: 400 });
  }

  return createPost(user.id, text, file).then((posts) =>
    NextResponse.json(posts)
  );
}
