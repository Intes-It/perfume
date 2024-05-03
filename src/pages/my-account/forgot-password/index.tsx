
import Input from "@components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@utils/apiRoute";
import { POST } from "@utils/fetch";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const schema = yup.object().shape({
  email: yup.string().email("Email incorrect!").required("Email is required"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const route = useRouter();

  const onSubmit = async (data: { email: string }) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await POST(api.forgotPassword, data);
      if (res.data?.message?.includes("sent")) {
        route.push(`/my-account/reset-password?email=${data.email}`);
      } else {
        if (res.data?.detail) {
          const entriesData = Object.entries(res.data.detail) as any;
          for (const [key, value] of entriesData) {
            setError(key, {
              message: value,
            });
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };
  return (
    <div>

      <div className="grid h-28 content-center text-center bg-[#eff7cf]">
        <h1 className="mb-2 text-4xl font-extrabold">Mon Compte</h1>
      </div>
      <form
        className="max-w-[1440px] w-full min-h-[500px] mx-auto py-14 md:py-10 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="block mb-5 text-[#383E42] font-normal">
          Forgot your password? Please enter your email address. We’ll send you
          a code to reset your password.
        </span>
        <Input
          control={control}
          subClassName="text-base"
          required
          className="max-w-[540px]"
          field_name={"email"}
          name={"E-mail"}
        />

        <div className="mt-12">
          <button
            className="bg-[#603813] rounded-lg w-[320px] transition duration-300 ease-in-out h-12 gra3 flex items-center justify-center font-bold text-white cursor-pointer"
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
              <span>{"RECOVERY PASSWORD"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
