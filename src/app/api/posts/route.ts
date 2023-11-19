import { createPost, getFollowingPostsOf } from "@/service/post";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return withSessionUser(async (user) => {
    return getFollowingPostsOf(user.username).then((posts) =>
      NextResponse.json(posts)
    );
  });
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await req.formData();
    const text = form.get("text")?.toString();
    const file = form.get("file") as Blob;

    if (!text || !file) {
      return new Response("Missing text or file", { status: 400 });
    }

    return createPost(user.id, text, file).then((posts) =>
      NextResponse.json(posts)
    );
  });
}
