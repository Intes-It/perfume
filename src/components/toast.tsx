import { showToast } from "@redux/slices/toast/toastSlice";
import { useAppDispatch } from "@redux/store";
import { useSelector } from "react-redux";
const Toast = () => {
  const toast = useSelector((state: any) => state?.toast);
  const dispatch = useAppDispatch();

  return (
    <div
      id="toast-top-right"
      className="fixed flex items-center w-full max-w-xs p-3  text-gray-500 bg-white rounded-lg shadow top-16 right-5 ] "
      role="alert"
    >
      {toast && toast?.error ? (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-200 bg-red-100 rounded-lg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="16" height="16" rx="8" fill="#E03D3D" />
            <path
              d="M8.5 3V10.25H7.5V3H8.5ZM7.5 11.5H8.502V12.502H7.5V11.5Z"
              fill="white"
            />
          </svg>

          <span className="sr-only">Check icon</span>
        </div>
      ) : (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
      )}

      <div className="text-sm font-normal ms-3">{toast && toast.message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
        data-dismiss-target="#toast-success"
        aria-label="Close"
        onClick={() => dispatch(showToast({ message: "", error: false }))}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
