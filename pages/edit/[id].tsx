import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { IUser } from "..";
import { retrieveItem } from "../../db";

interface IEditProps {
  user: IUser;
}

const Index: NextPage<IEditProps> = ({ user }) => {
  const router = useRouter();
  const [data, setData] = useState<IUser>(user);

  const handleValueChange: ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    axios.put("/api/edit", data).then(() => router.push("/"));
  };

  return (
    <section>
      <h1 className="text-2xl">Edit user</h1>
      <div className="mx-20 mt-10">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={user.id} />
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
            Update User!
          </button>
        </form>
      </div>
    </section>
  );
};

export default Index;

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as IParams;
  const { id } = params;

  const user = retrieveItem(parseInt(id));

  return {
    props: {
      user,
    },
  };
};
