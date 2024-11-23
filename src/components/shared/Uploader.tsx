import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton, UploadDropzone } from "@/lib/utils/uploadthing";
export const Uploader = ({ onDrop }: any) => (
  <UploadDropzone
    className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
    endpoint="multiImageUploader"
    onClientUploadComplete={(res) => {
     
      console.log("Files: ", res);
      alert("Upload Completed");
    }}
    onUploadError={(error: Error) => {
      // Do something with the error.
      alert(`ERROR! ${error.message}`);
    }}
  />
);
