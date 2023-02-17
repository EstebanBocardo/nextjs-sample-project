import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { IUser } from "..";

type IFormData = Partial<IUser>;

const Index: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState<IFormData>({ name: "", role: "Admin" });

  const handleValueChange: ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    axios.post("/api/create", data).then(() => router.push("/"));
  };

  return (
    <section>
      <h1 className="text-2xl">Create new user</h1>
      <div className="mx-20 mt-10">
        <form onSubmit={handleSubmit}>
          <div className="flex space-y-2 flex-col">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleValueChange}
            />
          </div>
          <div className="flex space-y-2 flex-col">
            <label htmlFor="role">Role: </label>
            <select
              name="role"
              id="role"
              onChange={handleValueChange}
              value={data.role}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <button
            className=" bg-slate-500 px-7 py-2 mt-10 rounded-md text-white"
            type="submit"
          >
            Save!
          </button>
        </form>
      </div>
    </section>
  );
};

export default Index;
