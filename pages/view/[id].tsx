import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { IUser } from "..";
import { retrieveAll, retrieveItem } from "../../db";

interface IViewProps {
  user: IUser;
}

const Index: NextPage<IViewProps> = ({ user }) => {
  return (
    <section>
      <h1 className="text-2xl">View user</h1>
      <div className="mx-20 mt-10">
        <p>Name: {user.name}</p>
        <p>Role: {user.role}</p>
      </div>
    </section>
  );
};

export default Index;

interface IParams extends ParsedUrlQuery {
  id: string;
}

export async function getStaticPaths() {
  const users = retrieveAll();
  const paths = users.map((user) => ({
    params: {
      id: user.id.toString(),
    },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = (context) => {
  const params = context.params as IParams;
  const { id } = params;

  const user = retrieveItem(parseInt(id));

  return {
    props: {
      user,
    },
  };
};
