interface Props {
  text: string;
  onClick: () => void;
}

export default function ColorButton({ text, onClick }: Props) {
  return (
    <div className="rounded bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.15rem]">
      <button
        className="bg-white hover:opacity-90 text-base py-1 px-2 rounded-sm transition-opacity"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
