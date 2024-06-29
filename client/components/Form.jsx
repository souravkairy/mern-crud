"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { userInfo } from "../utils/Atoms";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useAtom(userInfo);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5555/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        return;
      }

      const json = await response.json();
      setUser(json);
      toast.success("added");
      router.push("/");

      console.log(json);
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl pb-4 text-center">
        Sign Up Form with JWT Authentication
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="">
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-sm border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              placeholder="you@example.com"
              {...register("email")}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium leading-6 text-gray-900">
            Password
          </label>
          <div className="">
            <input
              type="password"
              name="password"
              className="block w-full rounded-sm border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              placeholder="min 8 digit"
              {...register("password")}
            />
          </div>
        </div>
        <button
          type="submit"
          className="block rounded-sm bg-indigo-600 px-3 py-2 text-center text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Form;
