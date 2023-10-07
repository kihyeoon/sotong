interface Props {
  text: string;
  onClick: () => void;
  size?: "small" | "large";
}

export default function ColorButton({ text, onClick, size = "small" }: Props) {
  return (
    <div className="rounded bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.1rem] h-fit">
      <button
        className={`bg-white hover:opacity-90 rounded-sm transition-opacity ${
          size === "large" ? "text-xl py-2 px-4" : "text-base py-1 px-2"
        }`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
