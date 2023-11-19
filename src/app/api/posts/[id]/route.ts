import { getPost } from "@/service/post";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: {
    id: string;
  };
}

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async () => {
    return getPost(context.params.id).then((post) => NextResponse.json(post));
  });
}
