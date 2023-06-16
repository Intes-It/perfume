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
      className="fixed z-50 inset-0 bg-black bg-opacity-75 flex justify-center items-center m-0"
    >
      <div className="absolute top-2 right-3">
        <button onClick={() => onClose()} className="text-white text-xl">
          X
        </button>
      </div>

      <img src={imgUrl} alt="image" className="max-w-[90%] max-h-[90%]" />
    </div>
  );
};

export default ImageModal;
