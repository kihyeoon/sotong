/* eslint-disable @next/next/no-img-element */
interface Props {
  image?: string | null;
}

export default function Avatar({ image }: Props) {
  return (
    <div>
      <img
        src={image ?? undefined}
        alt="user profile"
        className="w-9 h-9 rounded-full"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
