import Link from "next/link";
import React from "react";
import { IUser } from "../pages";

interface IUserCardProps {
  user: IUser;
  handleDeleteUser: (id: number) => void;
}

export default function UserCard({ user, handleDeleteUser }: IUserCardProps) {
  return (
    <div className=" bg-green-700 text-white my-3 rounded-md py-6 px-3">
      <div className="flex justify-between items-center">
        <span>{user.name}</span>
        <div className=" space-x-4">
          <Link href={`/edit/${user.id}`}>Edit</Link>
          <Link href={`/view/${user.id}`}>View</Link>
          <span
            className="font-bold cursor-pointer"
            onClick={() => handleDeleteUser(user.id)}
          >
            Delete
          </span>
        </div>
      </div>
      <span className="font-bold">{user.role}</span>
    </div>
  );
}
