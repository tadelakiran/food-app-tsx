import React from "react";
import type { RegisterRequest } from "../interfaces/RegitserRequest";
import { useForm } from "react-hook-form";
import { registerService } from "../services/registerService";

function Register() {
  const { register, handleSubmit, reset } = useForm<RegisterRequest>();

  const onSubmit = (data: RegisterRequest) => {
    console.log(data);
    registerService(data);
    reset();
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join our community for fresh produce</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              {...register("name", { required: "Username is required" })}
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400"
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phone", { required: "Phone is required" })}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl mt-6"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Login here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;