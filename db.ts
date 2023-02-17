import { IUser } from "./pages";
import { readFileSync, writeFileSync } from "fs";

export const saveItem = (item: Omit<IUser, "id">): IUser => {
  const data = retrieveAll();
  const id = data.length
    ? data.reduce((_prev, current) => {
        return current;
      }).id + 1
    : 1;

  const newItem = { ...item, id: id };

  try {
    data.push(newItem);
    writeFileSync("data.json", JSON.stringify(data));
    return newItem;
  } catch (error) {
    throw new Error("Error saving item");
  }
};

export const retrieveItem = (id: number): IUser | null => {
  const data = retrieveAll();

  return data.find((user) => user.id === id) ?? null;
};

export const editItem = (id: number, userData: Omit<IUser, "id">): IUser => {
  const updatedUser = { ...userData, id };
  const data = retrieveAll();
  const newData = data.map((user) => (user.id === id ? updatedUser : user));

  try {
    writeFileSync("data.json", JSON.stringify(newData));
    return updatedUser;
  } catch (error) {
    throw new Error("Error saving item");
  }
};

export const deleteItem = (id: number): void => {
  const data = retrieveAll();
  const newData = data.filter((user) => user.id !== id);

  try {
    writeFileSync("data.json", JSON.stringify(newData));
  } catch (error) {
    throw new Error("Error saving item");
  }

  return;
};

export const retrieveAll = (): Array<IUser> => {
  try {
    const rawData = readFileSync("data.json", "utf-8");
    const data = JSON.parse(rawData);
    return data as Array<IUser>;
  } catch (error) {
    return [];
  }
};
