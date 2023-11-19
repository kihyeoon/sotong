"use client";
import PostUserAvatar from "@/components/PostUserAvatar";
import Button from "@/components/ui/Button";
import FilesIcon from "@/components/ui/icons/FilesIcon";
import { AuthUser } from "@/model/user";
import { ChangeEvent, DragEvent, useState } from "react";

interface Props {
  user: AuthUser;
}

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleDrag = (event: DragEvent<HTMLLabelElement>) => {
    if (event.type === "dragenter") {
      setDragging(true);
    } else if (event.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  return (
    <section>
      <PostUserAvatar username={username} userImage={image ?? ""} />
      <form>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FilesIcon />
          <p>Drag and Drop your image here or click</p>
        </label>
        <textarea
          className="w-full h-20 p-2 border border-gray-300 rounded-md"
          name="text"
          id="input-text"
          rows={10}
          placeholder="What's on your mind?"
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
