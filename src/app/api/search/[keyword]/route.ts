import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { keyword: string };
}

export async function GET(_: NextRequest, { params: { keyword } }: Context) {
  return searchUsers(keyword).then((data) => NextResponse.json(data));
}
