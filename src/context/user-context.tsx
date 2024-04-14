import React, { ReactNode, useEffect, useState } from 'react';
import { UserProps, getUserService } from '../services/user';

const UserContext = React.createContext<{
  user: UserProps | null;
  setUser: (user: UserProps) => void;
} | null>(null);

UserContext.displayName = 'UserContext';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    if (!user) {
      async function getUser() {
        const res = await getUserService();
        res.data && setUser(res.data);
      }
      getUser();
    }
  }, [user]);

  return <UserContext.Provider value={{ user, setUser }} children={children} />;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser必须在UserProvider中使用');
  }
  return context;
};
