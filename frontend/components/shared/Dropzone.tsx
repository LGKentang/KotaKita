"use client";
import { useDropzone } from "react-dropzone";

type Props = {
  className?: string;
  onDrop: (acceptedFiles: File[]) => void; // Accept onDrop as a prop
};

export default function Dropzone({ className = "", onDrop }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <button className={className} onClick={(e) => e.preventDefault()}>
        <p className="font-semibold">Insert Image</p>
      </button>
    </div>
  );
}
