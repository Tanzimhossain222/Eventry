"use client";

import { performLogin } from "@/app/actions";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState(null);
  const { setAuth } = useAuth();
  const route = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const found = await performLogin(formData);

      if (found) {
        setAuth(found);
        route.push("/");
      } else {
        setError("Invalid credentials");
      }
      
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="my-2">
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
