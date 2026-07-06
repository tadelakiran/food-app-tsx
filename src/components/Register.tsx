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
    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        type="text"
        {...register("name")}
        placeholder="Username"
        className="rounded-2xl! border! border-slate-30! p-4! "
      />

      <br /><br />

      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="rounded-2xl! border! border-slate-30! p-4! "

      />

      <br /><br />

      <input
        type="email"
        {...register("email")}
        placeholder="Email"
        className="rounded-2xl! border! border-slate-30! p-4! "

      />

      <br /><br />

      <input
        type="number"
        {...register("phone")}
        placeholder="Enter Phone Number"
        className="rounded-2xl! border! border-slate-30! p-4! "

      />

      <br /><br />

      <button type="submit"
      className="p-4! border border-s-black bg-green-500 text-white border-none">Register</button>

    </form>
  );
}

export default Register;
