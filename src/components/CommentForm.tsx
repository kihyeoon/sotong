import SmileIcon from "@/components/ui/icons/SmileIcon";

export default function CommentForm() {
  return (
    <>
      <form className="flex items-center px-4 border-t border-neutral-300">
        <SmileIcon />
        <input
          className="w-full ml-2 border-none outline-none p-3 bg-transparent"
          type="text"
          placeholder="Add a comment..."
        />
        <button className="font-semibold text-sky-500">Post</button>
      </form>
    </>
  );
}
