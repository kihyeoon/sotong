import SmileIcon from "@/components/ui/icons/SmileIcon";
import { FormEvent, useState } from "react";

interface Props {
  onPostComment: (comment: string) => void;
}

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center px-4 border-t border-neutral-300"
      >
        <SmileIcon />
        <input
          className="w-full ml-2 border-none outline-none p-3 bg-transparent"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button
          disabled={buttonDisabled}
          className={`font-semibold ${
            buttonDisabled ? "text-sky-300" : "text-sky-500"
          }`}
        >
          Post
        </button>
      </form>
    </>
  );
}
