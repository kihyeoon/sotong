/* eslint-disable @next/next/no-img-element */
interface Props {
  image?: string | null;
  size?: "small" | "medium";
  highlight?: boolean;
}

export default function Avatar({
  image,
  size = "medium",
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        src={image ?? undefined}
        alt="user profile"
        className={`rounded-full bg-white object-cover ${getImageSizeStyle(
          size
        )}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(
  size: Required<Props>["size"],
  highlight: Required<Props>["highlight"]
) {
  const baseStyle = "rounded-full flex justify-center items-center";
  const sizeStyle = {
    small: "w-9 h-9",
    medium: "w-[68px] h-[68px]",
  }[size];

  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.1rem]"
    : "";

  return `${baseStyle} ${sizeStyle} ${highlightStyle}`;
}

function getImageSizeStyle(size: Required<Props>["size"]) {
  const sizeStyle = {
    small: "w-[34px] h-[34px] p-[0.1rem]",
    medium: "w-16 h-16 p-[0.15rem]",
  }[size];

  return `${sizeStyle}`;
}
