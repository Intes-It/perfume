import Input from "@components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@utils/apiRoute";
import { POST } from "@utils/fetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import * as yup from "yup";

const optionResetPass = [
  {
    name: "new_password",
    placeholder: "New Password",
  },
  {
    name: "confirm_password",
    placeholder: "Confirm Password",
  },
];

const lengthRegex = /.{8,}/; // At least 8 characters in length
const lowercaseRegex = /[a-z]/; // At least one lowercase letter
const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
const numberRegex = /[0-9]/; // At least one number
const specialRegex = /^(?=.*[!@#$%^&*()]).+$/;

type ConfirmOtpProps = {
  changeTab: () => void;
  email: string;
};

type dataResetPassword = {
  new_password: string;
  confirm_password: string;
  code: string;
};
const schema = yup.object().shape({
  new_password: yup.string().required("New password is required."),
  code: yup
    .string()
    .required("Otp is required.")
    .length(6, "OTP must be a six-digit number."),
  confirm_password: yup
    .string()
    .required("Confirm password is required.")
    .test(
      "passwords-match",
      "Confirm password does not match.",
      function (value) {
        return this.parent.new_password === value;
      }
    ),
});

const ConfirmOtp = ({ changeTab, email }: ConfirmOtpProps) => {
  const {
    control,
    watch,
    formState: { isDirty },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      code: "",
      new_password: "",
      confirm_password: "",
    },
    resolver: yupResolver(schema),
  });

  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);
  const [isShowPassword, setIsShowPassWord] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);

  const router = useRouter();

  const handleShowPassword = (value: string) => {
    const shallowCopy = [...isShowPassword];

    if (shallowCopy.includes(value)) {
      const newData = shallowCopy.filter((item) => item !== value);
      setIsShowPassWord(newData);
    } else {
      const newData = [...shallowCopy, value];
      setIsShowPassWord(newData);
    }
  };

  const password = watch("new_password");
  const confirm_password = watch("confirm_password");
  const hasLength = lengthRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasUppercase = uppercaseRegex.test(password);
  const hasSpecial = specialRegex.test(password);
  const hasNumber = numberRegex.test(password);

  const isValidSubmit =
    hasNumber &&
    hasSpecial &&
    hasUppercase &&
    hasLowercase &&
    confirm_password &&
    hasLength;

  const onSubmit = async (data: dataResetPassword) => {
    const payload = {
      email: email,
      new_password: data.new_password,
      code: data.code,
    };

    if (isLoading || !isValidSubmit) return;
    setIsLoading(true);
    try {
      const res = await POST(api.reset_password, payload);

      if (res.status === 200) {
        changeTab();
        setIsLoading(false);
        return;
      }

      if (res.data?.detail?.code === "This code is invalid.") {
        setError("code", {
          message: "Incorrect or Expired OTP code. Please try again.",
        });
      } else
        setError("code", {
          message: res.data?.message,
        });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (isLoadingOtp || minutes > 0 || seconds > 0) return;
    setIsLoadingOtp(true);

    try {
      const res = await POST(api.forgotPassword, {
        email: email,
      });
      if (res.status === 200) {
        setMinutes(4);
        setSeconds(59);
      } else {
        if (res.data?.detail?.code === "This code is invalid.") {
          setError("code", {
            message: "Incorrect or Expired OTP code. Please try again.",
          });
        }
        if (res.data?.detail) {
          const entriesData = Object.entries(res.data.detail) as any;
          for (const [key, value] of entriesData) {
            setError(key, {
              message: value,
            });
          }
        }
      }

      setIsLoadingOtp(false);
    } catch (error) {
      console.log("error", error);
      setIsLoadingOtp(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0) {
          clearInterval(interval);
          // Timer has reached 0, handle completion here
          // For example, display a message or trigger an action
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
      //eslint- disable-next-line
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email]);

  return (
    <form className="font-normal" onSubmit={handleSubmit(onSubmit)}>
      <div className=" text-[#374151] mb-5 lg:w-1/2 w-full">
        A verification code has been sent to your email. Allow to input maximum
        6 numbers.
      </div>
      <div className="grid items-center w-full grid-cols-1 gap-10 lg:gap-20 sm:grid-cols-2 sm:gap-0">
        <Input
          control={control}
          required
          field_name={"code"}
          type="number"
          className="no-arrow"
          maxLength={6}
          subClassName="text-base"
          name={"OTP Code"}
          style={{
            fontWeight: 600,
            fontSize: 24,
            height: 60,
          }}
        />
      </div>
      <div className="mt-10 flex gap-2 text-[#374151]">
        <div
          className={twMerge(
            "transition-all ease-in-out duration-300",
            minutes === 0 &&
              seconds === 0 &&
              "text-active-link cursor-pointer font-semibold",
            isLoadingOtp && "opacity-70 text-gray-400"
          )}
          onClick={handleResendOtp}
        >
          Resend code{" "}
        </div>

        <div
          className={twMerge(
            "opacity-0 transition-all ease-in-out duration-300",
            (minutes !== 0 || seconds !== 0) && "opacity-100"
          )}
        >{`(${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")})`}</div>
      </div>
      <div className="grid grid-cols-1 gap-10 mt-6 md:grid-cols-2 lg:gap-20">
        <div className="flex flex-col order-last gap-3 sm:order-first">
          {optionResetPass.map((item) => (
            <div key={item.name}>
              <Input
                field_name={item.name}
                placeholder={item.placeholder}
                control={control}
                name={item.placeholder}
                subClassName="text-base"
                autoComplete={item.name}
                onKeyPress={(e) => {
                  e.key === " " && e.preventDefault();
                }}
                maxLength={20}
                required
                type={isShowPassword.includes(item.name) ? "password" : "text"}
                iconShowHidePass={
                  <div
                    className="absolute flex items-center cursor-pointer right-4 bottom-3"
                    onClick={() => handleShowPassword(item.name)}
                  >
                    {isShowPassword.includes(item.name) ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M22.2959 6.30998C22.3865 6.34877 22.4687 6.40506 22.5376 6.47563C22.6065 6.5462 22.6608 6.62967 22.6974 6.72126C22.734 6.81285 22.7521 6.91075 22.7509 7.00937C22.7496 7.10799 22.7288 7.20539 22.6899 7.29598L22.0009 6.99998L22.6909 7.29598L22.6889 7.29998L22.6859 7.30698L22.6759 7.33098L22.6369 7.41498C22.4187 7.86819 22.176 8.30917 21.9099 8.73598C21.3764 9.59391 20.758 10.396 20.0639 11.13L21.0319 12.099C21.1643 12.2412 21.2365 12.4292 21.233 12.6235C21.2296 12.8178 21.1509 13.0032 21.0135 13.1406C20.8761 13.278 20.6907 13.3567 20.4964 13.3602C20.3021 13.3636 20.114 13.2915 19.9719 13.159L18.9709 12.159C18.2745 12.7459 17.5112 13.2484 16.6969 13.656L17.6309 15.091C17.7393 15.2578 17.7771 15.4609 17.7358 15.6555C17.6946 15.8502 17.5777 16.0205 17.4109 16.129C17.244 16.2375 17.041 16.2752 16.8463 16.234C16.6516 16.1927 16.4813 16.0758 16.3729 15.909L15.2839 14.235C14.5039 14.49 13.6609 14.663 12.7519 14.725V16.5C12.7519 16.6989 12.6728 16.8897 12.5322 17.0303C12.3915 17.171 12.2008 17.25 12.0019 17.25C11.8029 17.25 11.6122 17.171 11.4715 17.0303C11.3309 16.8897 11.2519 16.6989 11.2519 16.5V14.725C10.4162 14.6687 9.59024 14.5123 8.79185 14.259L7.71785 15.909C7.66414 15.9916 7.59469 16.0628 7.51345 16.1186C7.43222 16.1743 7.3408 16.2135 7.24441 16.234C7.14803 16.2544 7.04856 16.2556 6.95169 16.2376C6.85482 16.2196 6.76245 16.1827 6.67985 16.129C6.51303 16.0205 6.39613 15.8502 6.35487 15.6555C6.33445 15.5592 6.3332 15.4597 6.35121 15.3628C6.36923 15.266 6.40614 15.1736 6.45985 15.091L7.37285 13.689C6.55199 13.2853 5.78222 12.7851 5.07985 12.199L4.11985 13.159C3.97846 13.2957 3.78905 13.3714 3.5924 13.3697C3.39575 13.3681 3.2076 13.2893 3.06848 13.1503C2.92936 13.0114 2.85039 12.8233 2.84859 12.6266C2.84679 12.43 2.9223 12.2405 3.05885 12.099L3.98285 11.175C3.00084 10.1459 2.16988 8.98264 1.51485 7.71998C1.44926 7.59209 1.38658 7.46272 1.32685 7.33198L1.31685 7.30698L1.31285 7.29998V7.29698H1.31085C1.23235 7.11412 1.2297 6.90656 1.3035 6.72174C1.37729 6.53692 1.52148 6.38899 1.70435 6.31048C1.88722 6.23198 2.09378 6.22934 2.2786 6.30313C2.46341 6.37693 2.61135 6.52112 2.68985 6.70398V6.70598L2.69685 6.71998L2.72585 6.78298C2.92105 7.18679 3.13804 7.57971 3.37585 7.95998C3.85085 8.71998 4.57285 9.70698 5.55585 10.622C6.42285 11.427 7.48385 12.168 8.75285 12.656C9.78943 13.0533 10.8908 13.2547 12.0009 13.25C13.1341 13.2549 14.2579 13.0448 15.3129 12.631C16.5749 12.134 17.6289 11.388 18.4879 10.582C19.6363 9.49143 20.5808 8.20457 21.2769 6.78198L21.3049 6.71898L21.3109 6.70598M22.2959 6.30998C22.1131 6.23188 21.9068 6.23051 21.7223 6.30438C21.5378 6.37826 21.3902 6.52234 21.3119 6.70498L22.2959 6.30998Z"
                          fill="black"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 8.25C11.0054 8.25 10.0516 8.64509 9.34835 9.34835C8.64509 10.0516 8.25 11.0054 8.25 12C8.25 12.9946 8.64509 13.9484 9.34835 14.6517C10.0516 15.3549 11.0054 15.75 12 15.75C12.9946 15.75 13.9484 15.3549 14.6517 14.6517C15.3549 13.9484 15.75 12.9946 15.75 12C15.75 11.0054 15.3549 10.0516 14.6517 9.34835C13.9484 8.64509 12.9946 8.25 12 8.25ZM9.75 12C9.75 11.4033 9.98705 10.831 10.409 10.409C10.831 9.98705 11.4033 9.75 12 9.75C12.5967 9.75 13.169 9.98705 13.591 10.409C14.0129 10.831 14.25 11.4033 14.25 12C14.25 12.5967 14.0129 13.169 13.591 13.591C13.169 14.0129 12.5967 14.25 12 14.25C11.4033 14.25 10.831 14.0129 10.409 13.591C9.98705 13.169 9.75 12.5967 9.75 12Z"
                          fill="black"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 3.25C7.486 3.25 4.445 5.954 2.68 8.247L2.649 8.288C2.249 8.807 1.882 9.284 1.633 9.848C1.366 10.453 1.25 11.112 1.25 12C1.25 12.888 1.366 13.547 1.633 14.152C1.883 14.716 2.25 15.194 2.649 15.712L2.681 15.753C4.445 18.046 7.486 20.75 12 20.75C16.514 20.75 19.555 18.046 21.32 15.753L21.351 15.712C21.751 15.194 22.118 14.716 22.367 14.152C22.634 13.547 22.75 12.888 22.75 12C22.75 11.112 22.634 10.453 22.367 9.848C22.117 9.284 21.75 8.807 21.351 8.288L21.319 8.247C19.555 5.954 16.514 3.25 12 3.25ZM3.87 9.162C5.498 7.045 8.15 4.75 12 4.75C15.85 4.75 18.501 7.045 20.13 9.162C20.57 9.732 20.826 10.072 20.995 10.454C21.153 10.812 21.25 11.249 21.25 12C21.25 12.751 21.153 13.188 20.995 13.546C20.826 13.928 20.569 14.268 20.131 14.838C18.5 16.955 15.85 19.25 12 19.25C8.15 19.25 5.499 16.955 3.87 14.838C3.43 14.268 3.174 13.928 3.005 13.546C2.847 13.188 2.75 12.751 2.75 12C2.75 11.249 2.847 10.812 3.005 10.454C3.174 10.072 3.432 9.732 3.87 9.162Z"
                          fill="black"
                        />
                      </svg>
                    )}
                  </div>
                }
                style={{
                  borderRadius: 4,
                  paddingRight: 45,
                }}
              />
            </div>
          ))}
        </div>
        <div>
          <div
            className={twMerge(
              "transition-all ease-in-out duration-300 text-[#FF2626]",
              hasNumber &&
                hasSpecial &&
                hasUppercase &&
                hasLowercase &&
                hasLength &&
                "text-[#52C41A]"
            )}
          >
            Password must have:
          </div>
          <div className="flex flex-col order-2 gap-1 font-medium">
            <div
              className={twMerge(
                "transition-all ease-in-out duration-300",
                hasLength && "text-[#52C41A]",
                !hasLength && password.length > 0 && "text-[#FF2626]"
              )}
            >
              At least 8 characters in length.
            </div>
            <div
              className={twMerge(
                "transition-all ease-in-out duration-300",
                hasLowercase && hasUppercase && "text-[#52C41A]",
                (!hasLowercase || !hasUppercase) &&
                  password.length > 0 &&
                  "text-[#FF2626]"
              )}
            >
              At least one lower-case letter, one upper-case letter.{" "}
            </div>
            <div
              className={twMerge(
                "transition-all ease-in-out duration-300",
                hasSpecial && "text-[#52C41A]",
                !hasSpecial && password.length > 0 && "text-[#FF2626]"
              )}
            >
              At least one special character (@#:’’...).
            </div>
            <div
              className={twMerge(
                "transition-all ease-in-out duration-300",
                hasNumber && "text-[#52C41A]",
                !hasNumber && password.length > 0 && "text-[#FF2626]"
              )}
            >
              At least one number (0-9)..
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-[#603813] md:mx-0 mx-auto mt-12 rounded-lg w-[320px] transition duration-300 ease-in-out h-12 gra3 flex items-center justify-center font-bold text-white cursor-pointer"
        disabled={isLoading || !isDirty}
        style={{
          background: isLoading || !isDirty ? "rgb(209, 213, 219)" : "",
        }}
        type={"submit"}
      >
        {isLoading ? (
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          <span>{"CHANGE PASSWORD"}</span>
        )}
      </button>
    </form>
  );
};

export default ConfirmOtp;
