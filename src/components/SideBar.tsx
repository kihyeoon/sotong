import Avatar from "@/components/Avatar";
import { AuthUser } from "@/model/user";

interface Props {
  user: AuthUser;
}

export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <h2 className="font-bold">{name}</h2>
          <h3 className="text-neutral-500 leading-4">{username}</h3>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-8">
        About ﹒ Help ﹒ Press ﹒ API ﹒ Jobs ﹒ Privacy ﹒ Terms ﹒ Locations
        ﹒ Language
      </p>
      <p className="text-xs mt-8 text-neutral-500">
        Copyright 2023 SOTONG from KION
      </p>
    </>
  );
}
