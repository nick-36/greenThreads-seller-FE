"use client";

import { useCallback, useEffect, useState } from "react";

import Dropzone, { useDropzone } from "react-dropzone";
import { Cloud, File, Loader2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useFileUploadS3 from "@/hooks/useS3upload";
import { useFormContext } from "react-hook-form";

const ProductImage = () => {
  const form = useFormContext();
  const router = useRouter();
  const [files, setFiles] = useState<any>([]);
  const [rejected, setRejected] = useState<any>([]);
  const { onUploadToS3 } = useFileUploadS3();

  const onDrop = useCallback(async (acceptedFiles: any, rejectedFiles: any) => {
    setIsUploading(true);
    const progressInterval = startSimulatedProgress();
    if (acceptedFiles?.length) {
      onUploadToS3(acceptedFiles);
      setFiles((previousFiles: any) => [
        ...previousFiles,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles: any) => [...previousFiles, ...rejectedFiles]);
    }

    // handle file uploading
    // const res = await startUpload(acceptedFile);

    // if (!res) {
    //   return toast({
    //     title: "Something went wrong",
    //     description: "Please try again later",
    //     variant: "destructive",
    //   });
    // }

    // const [fileResponse] = res;

    // const key = fileResponse?.key;

    // if (!key) {
    //   return toast({
    //     title: "Something went wrong",
    //     description: "Please try again later",
    //     variant: "destructive",
    //   });
    // }

    clearInterval(progressInterval);
    setUploadProgress(100);

    console.log(acceptedFiles, rejectedFiles, "FILES");

    // startPolling({ key });
  }, []);

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 5,
    maxSize: 1024 * 4000,
    multiple: true,
  });
  const { toast } = useToast();

  // const { startUpload } = useUploadThing(
  //   isSubscribed ? "proPlanUploader" : "freePlanUploader"
  // );

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files: any) => files.filter((file: any) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
  };

  return (
    <section className="h-full p-2 w-full flex flex-col">
      <Dropzone>
        {() => (
          <div
            {...getRootProps()}
            className="border-2 h-48 m-4 border-dashed border-gray-300 rounded-lg"
          >
            <div className="flex items-center justify-center h-full w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                  <p className="mb-2 text-sm text-zinc-700">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-zinc-500">Image (up to 4MB)</p>
                </div>

                <input
                  {...getInputProps()}
                  type="file"
                  id="dropzone-file"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}
      </Dropzone>
      <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
        To Uploaded
      </h3>
      <ul id="gallery" className="flex flex-1 flex-wrap  pt-4">
        {files.map((file: any, index: number) => {
          console.log(file, "FILE");
          return (
            <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24 ">
              <article className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline cursor-pointer relative text-transparent hover:text-white shadow-sm ">
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  // className="h-full w-full object-contain rounded-md"
                  className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
                />

                <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3 hover:bg-black opacity-70 hover:backdrop-blur-md">
                  <h1 className="flex-1">{file.name?.substring(0, 6)}</h1>
                  <div className="flex">
                    <span className="p-1">
                      <i>
                        <svg
                          className="fill-current w-4 h-4 ml-auto pt-"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z"></path>
                        </svg>
                      </i>
                    </span>

                    <p className="p-1 size text-xs">
                      {Math.ceil(file.size / 1000000)} MB
                    </p>
                    <button
                      className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md"
                      data-target="blob:https://tailwindcomponents.com/ed693163-710c-4f3e-a8dd-0f47edc8c14b"
                      onClick={() => removeFile(file.name)}
                    >
                      <svg
                        className="pointer-events-none fill-current w-4 h-4 ml-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="pointer-events-none"
                          d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </section>
              </article>
            </li>
          );
        })}

        {!files.length && (
          <li
            id="empty"
            className="h-full w-full text-center flex flex-col  justify-center items-center"
          >
            <img
              className="mx-auto w-32"
              src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
              alt="no data"
            />
            <span className="text-small text-gray-500">No files selected</span>
          </li>
        )}
      </ul>
    </section>
  );
};

export default ProductImage;
