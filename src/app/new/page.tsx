import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NewPost from "@/components/NewPost";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "New Post",
  description: "Create a new post",
};

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  return <NewPost user={session.user} />;
}
