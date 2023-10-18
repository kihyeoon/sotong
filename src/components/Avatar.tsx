/* eslint-disable @next/next/no-img-element */

type AvatarSize = "small" | "medium" | "large" | "xlarge";
interface Props {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
}

export default function Avatar({
  image,
  size = "large",
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        src={image ?? undefined}
        alt="user profile"
        className={`rounded-full bg-white object-cover ${
          getSizeStyle(size).image
        }`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(
  size: AvatarSize,
  highlight: Required<Props>["highlight"]
) {
  const baseStyle = "rounded-full flex justify-center items-center";
  const { container } = getSizeStyle(size);
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.1rem]"
    : "";

  return `${baseStyle} ${container} ${highlightStyle}`;
}

function getSizeStyle(size: AvatarSize) {
  switch (size) {
    case "small":
      return {
        container: "w-9 h-9",
        image: "w-[34px] h-[34px] p-[0.1rem]",
      };
    case "medium":
      return {
        container: "w-11 h-11",
        image: "w-[42px] h-[42px] p-[0.1rem]",
      };
    case "large":
      return {
        container: "w-[68px] h-[68px]",
        image: "w-16 h-16 p-[0.2rem]",
      };
    case "xlarge":
      return {
        container: "w-[142px] h-[142px]",
        image: "w-[138px] h-[138px] p-[0.3rem]",
      };
    default:
      throw new Error(`Unsupported size type: ${size}`);
  }
}
