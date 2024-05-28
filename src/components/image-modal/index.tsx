import Image from "next/image";
import * as React from "react";

interface ImageModalProps {
  imgUrl: string;
  isShowModel: boolean;
  onClose: () => void;
}

const ImageModal: React.FunctionComponent<ImageModalProps> = ({
  imgUrl,
  isShowModel,
  onClose,
}: ImageModalProps) => {
  if (!isShowModel) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      id="wrapper"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center m-0 bg-black bg-opacity-75"
    >
      <div className="absolute top-2 right-3">
        <button onClick={() => onClose()} className="text-xl text-white">
          X
        </button>
      </div>

      <Image
        src={imgUrl}
        alt="image"
        className="max-w-[90%] max-h-[90%]"
        width={1000}
        height={1000}
      />
    </div>
  );
};

export default ImageModal;
