import axios from './http';

export interface UserProps {
  _id: string;
  email: string;
  phone: string;
  name: string;
}

export type ResponseType<T> = {
  code: number;
  data?: T;
  message?: string;
};

const USER_ID = '661b34c9523f509c9f9050de';

export const getUserService = async (): Promise<ResponseType<UserProps>> => {
  const url = `/api/users/${USER_ID}`;
  return await axios.get(url);
};

export const updateUserService = async (user: UserProps) => {
  const url = `/api/users/${user._id}`;
  return await axios.put(url, user);
};
