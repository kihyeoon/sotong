"use client";
import PostUserAvatar from "@/components/PostUserAvatar";
import Button from "@/components/ui/Button";
import FilesIcon from "@/components/ui/icons/FilesIcon";
import { AuthUser } from "@/model/user";
import Image from "next/image";
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
    <section className="w-full max-w-xl flex flex-col items-center mt-6 mx-1">
      <PostUserAvatar username={username} userImage={image ?? ""} />
      <form className="w-full flex flex-col mt-2 gap-4">
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && "border-2 border-sky-500 border-dashed"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 bg-sky-500/20 pointer-events-none" />
          )}
          {!file ? (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          ) : (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none resize-none text-lg border border-neutral-300"
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
