import { User } from "@/model/user";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
