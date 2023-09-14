"use client";

import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (url: string) => void;
  onRemove: (value: string) => void;
  urls: string[];
}

export default function ImageUpload({
  onChange,
  onRemove,
  urls,
  disabled,
}: ImageUploadProps) {
  function onUpload(result: any) {
    if (!result) return;
    onChange(result.info.secure_url);
  }
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {urls.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill src={url} alt="Image" className="object-cover" />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="ylc5z4ea" onUpload={onUpload}>
        {({ open }) => {
          function handleOnClick() {
            open();
          }
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={handleOnClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
